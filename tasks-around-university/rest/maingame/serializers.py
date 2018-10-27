from rest_framework import serializers
from rest.maingame.models import Hotspot, Player, Group, Player_Group

class HotspotSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    x = serializers.IntegerField()
    y = serializers.IntegerField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
    configuration = serializers.CharField(allow_blank=True, max_length=1024)
    qrCode = serializers.CharField(allow_blank=True, max_length=1024)
    
    def create(self, validated_data):
        return Hotspot.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.x = validated_data.get('x', instance.x)
        instance.y = validated_data.get('y', instance.y)
        instance.created_at = validated_data.get('created_at', instance.created_at)
        instance.updated_at = validated_data.get('updated_at', instance.updated_at)
        instance.configuration = validated_data.get('configuration', instance.configuration)
        instance.qrCode = validated_data.get('qrCode', instance.qrCode)
        instance.save()
        return instance

"""
class HotspotCompactSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    x = serializers.IntegerField()
    y = serializers.IntegerField()
    
    def create(self, validated_data):
"""


class PlayerLocationSerializer(serializers.ModelSerializer):
    """
    id = serializers.IntegerField(read_only=True)
    x = serializers.IntegerField()
    y = serializers.IntegerField()
    """
    class Meta:
        model = Player
        fields = ('id', 'x', 'y')

class PgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player_Group
        fields = ('group', 'player', 'isLeader')

class PlayerGroupLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player_Group
        fields = ()
        
