from django.db import models
from django.utils import timezone

class Hotspot(models.Model):
    id = models.AutoField(primary_key=True)
    x = models.IntegerField()
    y = models.IntegerField()
    #created_at: models.DateField(auto_now_add=True)
    #updated_at = models.DateField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default=timezone.now)
    configuration = models.CharField(max_length=1024, blank=True)
    qrCode = models.CharField(max_length=1024, blank=True)
    
    #date päivän tarkkuus datetime mikrosekunti? default=timezone.now pitää muokattavuuden

class Player(models.Model):
    id = models.AutoField(primary_key=True)
    x = models.IntegerField()
    y = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default=timezone.now)
    # nimi, opintosuuntaus?

class Group(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default=timezone.now)

class Player_Group(models.Model):
    group = models.ForeignKey(Group, related_name='related_group', on_delete=models.CASCADE)
    player = models.ForeignKey(Player, related_name='related_player', on_delete=models.CASCADE)
    isLeader = models.BooleanField()
