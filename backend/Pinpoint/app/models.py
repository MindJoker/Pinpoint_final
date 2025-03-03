from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class AdministrationProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='administration_profile')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"[{self.user.id}]Admin: {self.user.username}"
    
class OperatorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='operator_profile')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"[{self.user.id}]Operator: {self.user.username}"
