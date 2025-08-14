from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User')
    )

    POSITION_CHOICES = (
        ('global admin', 'Global Admin'),
        ('country manager', 'Country Manager'),
        ('station manager', 'Station Manager')
    )

    role = models.CharField(
        max_length=10, choices=ROLE_CHOICES, default='user')
    position = models.CharField(
        max_length=20, choices=POSITION_CHOICES, default='station manager')
    country = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
