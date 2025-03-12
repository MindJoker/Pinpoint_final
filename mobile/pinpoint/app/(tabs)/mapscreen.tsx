// MapScreen.tsx
import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import * as Location from 'expo-location';
import Bubble from '../../common/Bubble';
import * as MakiIcons from '@mapbox/maki';

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || "");

const MapScreen: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  // Richiedi permessi e posizione iniziale
  useEffect(() => {
    const requestUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationGranted(status === "granted");

      if (status !== "granted") return;

      const currentLocation = await Location.getCurrentPositionAsync({});
      setUserLocation(currentLocation);
    };

    requestUserLocation();
  }, []);

  // Effetto per aggiornare la posizione della camera quando disponibile
  useEffect(() => {
    if (userLocation && cameraRef.current) {
      const { longitude, latitude } = userLocation.coords;
      cameraRef.current.flyTo([longitude, latitude], 2000);
    }
  }, [userLocation]);

  if (locationGranted === false) {
    return (
      <View style={styles.deniedContainer}>
        <Text style={{ color: 'white' }}>Permesso posizione negato</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <MapboxGL.MapView style={styles.map}>
      <MapboxGL.Camera
        ref={cameraRef}
        zoomLevel={10}
        centerCoordinate={
          userLocation
            ? [userLocation.coords.longitude, userLocation.coords.latitude]
            : [12.4964, 41.9028] // Roma come default
        }
      />
      <MapboxGL.UserLocation
        visible
        androidRenderMode="gps"
        showsUserHeadingIndicator
        onUpdate={(locationUpdate) => {
          setUserLocation({
            coords: {
              longitude: locationUpdate.coords.longitude,
              latitude: locationUpdate.coords.latitude,
              altitude: locationUpdate.coords.altitude ?? null,
              accuracy: locationUpdate.coords.accuracy ?? null,
              heading: locationUpdate.coords.heading ?? null,
              speed: locationUpdate.coords.speed ?? null,
              altitudeAccuracy: null
            },
            timestamp: locationUpdate.timestamp ?? Date.now(),
          });
        }}
      />
    </MapboxGL.MapView>

    <Bubble>
      {userLocation && (
        <>
          <Text>Timestamp: {new Date(userLocation.timestamp).toLocaleString()}</Text>
          <Text>Longitude: {userLocation.coords.longitude}</Text>
          <Text>Latitude: {userLocation.coords.latitude}</Text>
          <Text>Altitude: {userLocation.coords.altitude}</Text>
          <Text>Heading: {userLocation.coords.heading}</Text>
          <Text>Accuracy: {userLocation.coords.accuracy}</Text>
          <Text>Speed: {userLocation.coords.speed}</Text>
        </>
      )}
    </Bubble>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  deniedContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default MapScreen;
