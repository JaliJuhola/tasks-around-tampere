from django.db import models
from rest.maingame.models import Player, Group

class PushTheButtons2MainGame(models.Model):
    id = models.AutoField(primary_key=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now=True)
    current_score = models.IntegerField(default=0)
    game_ended = models.BooleanField(default=False)
    class Meta:
        ordering = ('id',)

class PushTheButtons2PlayerGame(models.Model):
    id = models.AutoField(primary_key=True)
    maingame = models.ForeignKey(PushTheButtons2MainGame, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now=True)
    current_score = models.IntegerField(default=0)
    push_count = models.IntegerField(default=0)
    game_ended = models.BooleanField(default=False)
    class Meta:
        ordering = ('id',)
