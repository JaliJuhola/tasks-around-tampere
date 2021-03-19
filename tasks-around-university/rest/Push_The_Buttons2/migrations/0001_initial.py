# Generated by Django 2.0.1 on 2019-01-17 16:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('maingame', '0008_auto_20190106_0034'),
    ]

    operations = [
        migrations.CreateModel(
            name='PushTheButtons2MainGame',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('current_score', models.IntegerField(default=0)),
                ('game_ended', models.BooleanField(default=False)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='maingame.Group')),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='PushTheButtons2PlayerGame',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('current_score', models.IntegerField(default=0)),
                ('push_count', models.IntegerField(default=0)),
                ('game_ended', models.BooleanField(default=False)),
                ('maingame', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Push_The_Buttons2.PushTheButtons2MainGame')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='maingame.Player')),
            ],
            options={
                'ordering': ('id',),
            },
        ),
    ]