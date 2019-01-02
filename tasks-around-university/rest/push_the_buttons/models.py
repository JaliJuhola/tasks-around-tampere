from django.db import models
from rest.maingame.models import Player, Group
class PushTheButtonsMainGame(models.Model):
    id = models.AutoField(primary_key=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now=True)
    next_push_before = models.DateTimeField(null=True)
    current_score = models.IntegerField(default=0)
    next_to_click = models.ForeignKey(Player, on_delete=models.CASCADE, null=True)
    game_ended = models.BooleanField(default=False)
    class Meta:
        ordering = ('id',)
