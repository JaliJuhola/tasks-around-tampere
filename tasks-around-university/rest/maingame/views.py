from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
#from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest.maingame.models import Hotspot, Player, Group
from rest.maingame.serializers import HotspotSerializer, PlayerSerializer, PlayerLocationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest.maingame.channels import WaitingPlayersToJoinChannels
import uuid
from rest.common.channels import PUSHER_CLIENT
import json

class AuthView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def get(self, request, format=None):
        identifier = request.GET["id"]
        if not identifier:
            return Response({'id': 'This field is required!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            player = Player.objects.get(id=identifier)
        except Player.DoesNotExist:
           return Response({'message': 'player not found'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'token': player.token})

    def post(self, request, format=None):
        serializer = PlayerSerializer(data=request.data)
        token = uuid.uuid1()
        if serializer.is_valid():
            serializer.save(token=token)
            return Response({'token': token}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PlayerGroupView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def get(self, request):
        identifier = request.GET["group_id"]
        if not identifier:
            return Response({'id': 'This field is required!'}, status=status.HTTP_400_BAD_REQUEST)
        players = Player.objects.filter(group__id=identifier)
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        identifier = request.data['group_id']
        if not identifier:
            return Response({'id': 'This field is required!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            group = Group.objects.get(id=identifier)
            request.user.group = group
            request.user.save()
            players_on_game = Player.objects.filter(group=group).count()
            WaitingPlayersToJoinChannels.new_push_available(request.user.name, players_on_game, group.id, group.name)
        except Group.DoesNotExist:
           return Response({'message': 'invalid group_id'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({ 'player_id': request.user.id, 'player_name': request.user.name, 'group_name': request.user.group.name, 'group_id': request.user.group.id}, status=status.HTTP_201_CREATED)

