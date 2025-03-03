# Serializers define the API representation.
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import AdministrationProfile, OperatorProfile



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']