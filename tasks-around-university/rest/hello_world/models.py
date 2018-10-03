from django.db import models


class Counter(models.Model):
    id = models.AutoField(primary_key=True)
    ts = models.DateTimeField(auto_now_add=True)
    count = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('id',)
