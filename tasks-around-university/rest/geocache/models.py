from rest.maingame.models import Player, Group
from django.db import models

class GeocacheMainGame(models.Model):
    id = models.AutoField(primary_key=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now=True)
    current_score = models.IntegerField(default=0)
    game_ended = models.BooleanField(default=False)
    riddles_solved = models.IntegerField(default=0)
    class Meta:
        ordering = ('id',)


class GeocacheRiddles(models.Model):
    id = models.AutoField(primary_key=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now=True)
    riddle = models.CharField(max_length=128)
    answer = models.CharField(max_length=40)

    class Meta:
        ordering = ('id',)

