# Generated by Django 2.0.1 on 2019-01-02 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('maingame', '0005_lobby_lobbyplayer'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='icon_name',
            field=models.CharField(default='space-shuttle', max_length=40),
        ),
    ]
