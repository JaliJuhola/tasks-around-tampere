from django.db import models
from django.utils import timezone

class Hotspot(models.Model):
    id = models.AutoField(primary_key=True)
    x = models.IntegerField()
    y = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default=timezone.now)
    configuration = models.CharField(max_length=1024, blank=True)
    qr_code = models.CharField(max_length=1024, blank=True)


class Group(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default=timezone.now)


class Player(models.Model):
    id = models.AutoField(primary_key=True)
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default=timezone.now)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=True)

