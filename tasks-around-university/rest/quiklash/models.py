from django.db import models
from rest.maingame.models import Player, Group

class QuiklashMainGame(models.Model):
    id = models.AutoField(primary_key=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now=True)
    current_score = models.IntegerField(default=0)
    game_ended = models.BooleanField(default=False)
    class Meta:
        ordering = ('id',)

class QuiklashQuestion(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ('id',)

class QuiklashAnswer(models.Model):
    id = models.AutoField(primary_key=True)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    question = models.ForeignKey(QuiklashQuestion, on_delete=models.CASCADE)
    game = models.ForeignKey(QuiklashMainGame, on_delete=models.CASCADE)
    answer = models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ('id',)

