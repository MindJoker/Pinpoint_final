# Serializers define the API representation.
from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import AdministrationProfile, OperatorProfile



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']