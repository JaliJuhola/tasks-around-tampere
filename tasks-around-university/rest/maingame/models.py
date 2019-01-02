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
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default=timezone.now)

class Player(models.Model):
    id = models.AutoField(primary_key=True)
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)
    name = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default=timezone.now)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=True)
    leader = models.BooleanField(default=False)
    token = models.CharField(max_length=128)
    icon_name = models.CharField(max_length=40, default="space-shuttle")

class Lobby(models.Model):
    id = models.AutoField(primary_key=True)
    minigame = models.CharField(max_length=128)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=False)
    closed = models.BooleanField()

class LobbyPlayer(models.Model):
    lobby = models.ForeignKey(Lobby, on_delete=models.CASCADE, null=False)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, null=False)
    joined_since = models.DateTimeField(auto_now_add=True)