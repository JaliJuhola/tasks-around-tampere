# Generated by Django 2.0.1 on 2019-01-08 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geocache', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='geocachemaingame',
            name='tries',
            field=models.IntegerField(default=0),
        ),
    ]
