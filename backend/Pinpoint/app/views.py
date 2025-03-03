# ViewSets define the view behavior.
from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer

# Create your views here.
def index(request):
    return render(request, "chat/index.html")

def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer