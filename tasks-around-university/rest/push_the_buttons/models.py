from django.db import models

class PushTheButtonsMainGame(models.Model):
    id = models.AutoField(primary_key=True)
    group = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now=True)
    current_score = models.IntegerField(default=0)

    class Meta:
        ordering = ('id',)

