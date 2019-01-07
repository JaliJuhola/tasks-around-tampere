from django.db import models
from rest.maingame.models import Player, Group

class AliasMainGame(models.Model):
    id = models.AutoField(primary_key=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now=True)
    current_score = models.IntegerField(default=0)
    game_ended = models.BooleanField(default=False)
    class Meta:
        ordering = ('id',)

class AliasWords(models.Model):
    id = models.AutoField(primary_key=True)
    word = models.CharField(max_length=50)
    class Meta:
        ordering = ('id',)

class AliasScore(models.Model):
    id = models.AutoField(primary_key=True)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    class Meta:
        ordering = ('id',)

