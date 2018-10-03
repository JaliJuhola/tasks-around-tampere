from rest_framework import serializers
from rest.hello_world.models import Counter


class CounterSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    ts = serializers.DateTimeField()
    count = serializers.IntegerField()
    updated_at = serializers.DateTimeField()

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Counter.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.ts = validated_data.get('ts', instance.ts)
        instance.count = validated_data.get('count', instance.count)
        instance.updated_at = validated_data.get('updated_at', instance.updated_at)
        instance.save()
        return instance
