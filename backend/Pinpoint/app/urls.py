# chat/urls.py
from django.urls import path, include
from rest_framework import routers
from . import views

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)


urlpatterns = [
    # path("", views.index, name="index"),
    # path("<str:room_name>/", views.room, name="room"),
    
]