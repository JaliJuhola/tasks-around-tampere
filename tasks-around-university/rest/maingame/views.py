from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
#from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest.maingame.models import Hotspot, Player, Group, Lobby, LobbyPlayer
from rest.maingame.serializers import HotspotSerializer, PlayerSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest.maingame.channels import WaitingPlayersToJoinChannels
import uuid
from rest.common.channels import PUSHER_CLIENT
import json
from django.utils import timezone
from rest.push_the_buttons.models import PushTheButtonsMainGame
from rest.geocache.models import GeocacheMainGame
from rest.alias.models import AliasMainGame


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
        identifier = request.user.group.id
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

class PlayerView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def get(self, request):
        group_name = request.user.group.name
        player_name = request.user.name
        is_leader = request.user.leader
        player_id = request.user.id
        group_id = request.user.group.id
        return Response({'group': {'name': group_name, 'id': group_id}, 'player': {'name': player_name, 'id': player_id, 'leader': is_leader}})


class GroupView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def post(self, request):
        group_name = request.data['group_name']
        player = request.user
        group = Group.objects.create(name=group_name)
        player.group = group
        player.leader = True
        player.save()
        return Response({ 'player_id': request.user.id, 'player_name': request.user.name, 'group_name': group.name, 'group_id': group.id}, status=status.HTTP_201_CREATED)

class LobbyView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Lobby.objects.all()
    serializer_class = PlayerSerializer

    def post(self, request):
        minigame_name = request.data['minigame_name']
        group = request.user.group
        player = request.user
        player.last_connection = timezone.now() + timezone.timedelta(seconds=20)
        lobby, created = Lobby.objects.get_or_create(group=group, minigame=minigame_name, closed=False)
        lobby_player, created = LobbyPlayer.objects.get_or_create(lobby=lobby, player=player)
        lobby_player.joined_since = timezone.now() + timezone.timedelta(seconds=20)
        lobby_player.save()
        lobby.save()
        player.save()
        return Response({'lobby_id': lobby.id})

    def patch(self, request):
        lobby_id = request.data['lobby_id']
        player = request.user
        player.last_connection = timezone.now() + timezone.timedelta(seconds=20)
        lobby = Lobby.objects.get(id=int(lobby_id))
        lobby_player = LobbyPlayer.objects.get(lobby=lobby, player=player)
        lobby_player.joined_since = timezone.now() + timezone.timedelta(seconds=20)
        lobby_player.save()
        player.save()
        players_in_lobby = LobbyPlayer.objects.filter(lobby=lobby, joined_since__gte=timezone.now())
        response_array = []
        for player_in_lobby in players_in_lobby:
            player = player_in_lobby.player
            response_array.append({'id': player.id, 'name': player.name, 'x': player.x, 'y': player.y, 'group_id': player.group.id, 'avatar': player.icon_name})
        return Response({'players': response_array, 'closed': lobby.closed})

class LobbyExitView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Lobby.objects.all()
    serializer_class = PlayerSerializer

    def post(self, request):
        lobby_id = request.data['lobby_id']
        lobby = Lobby.objects.get(id=int(lobby_id))
        lobby.closed = True
        lobby.save()
        return Response({'status': True})

class AvatarView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Lobby.objects.all()
    serializer_class = PlayerSerializer

    def post(self, request):
        icon_name = request.data['icon_name']
        request.user.icon_name = icon_name
        request.user.save()
        return Response({'status': True})


class PlayerLocationView(APIView):
    def post(self, request):
        x_cord = request.data['x']
        y_cord = request.data['y']
        player = request.user
        player.last_connection = timezone.now() + timezone.timedelta(seconds=20)
        player.x = x_cord
        player.y = y_cord
        player.save()
        players = Player.objects.filter(group=player.group, last_connection__gte=timezone.now())
        response_array = []
        for player in players:
            player_type = 1
            if player == request.user:
                player_type= 3
            elif player.leader:
                player_type = 2
            response_array.append({'name': player.name, 'type': player_type, 'location': {'longitude': player.x, 'latitude': player.y}, 'avatar': "../assets/testmarker.png"})
        return Response({'players': response_array})

class MinigameProgressionView(APIView):
    def get(self, request):
        TOTAL_MINIGAMES = 4
        total_score = 0
        minigames_completed = 0
        push_the_buttons_group_max = 0
        push_the_buttons_max = 0
        push_the_buttons_group_count = 0
        alias_group_max = 0
        alias_max = 0
        alias_group_count = 0
        quiklash_group_max = 0
        quiklash_max = 0
        quiklash_group_count = 0
        geocache_group_max = 0
        geocache_max = 0
        geocache_group_count = 0
        # Push the buttons scores
        ptbmg = PushTheButtonsMainGame.objects.filter(game_ended=True).order_by('-current_score')
        ptbmg_group = ptbmg.filter(group=request.user.group).order_by('-current_score')
        if ptbmg_group.first():
            push_the_buttons_group_max = ptbmg_group.first().current_score
            push_the_buttons_group_count = ptbmg_group.count()
            minigames_completed = minigames_completed + 1
            total_score = total_score + push_the_buttons_group_max
        if ptbmg.first():
            push_the_buttons_max = ptbmg.first().current_score

        # geocache scores
        gcmg = GeocacheMainGame.objects.filter(game_ended=True).order_by('-current_score')
        gcmg_group= gcmg.filter(group=request.user.group).order_by('-current_score')
        if gcmg_group.first():
            geocache_group_max = gcmg_group.first().current_score
            geocache_group_count = gcmg_group.count()
            minigames_completed = minigames_completed + 1
            total_score = total_score + geocache_max
        if gcmg.first():
            geocache_max = gcmg.first().current_score

        # alias scores
        amg = AliasMainGame.objects.filter(game_ended=True).order_by('-current_score')
        amg_group= amg.filter(group=request.user.group).order_by('-current_score')
        if amg_group.first():
            alias_group_max = amg_group.first().current_score
            alias_group_count = amg_group.count()
            minigames_completed = minigames_completed + 1
            total_score = total_score + geocache_max
        if amg.first():
            alias_max = amg.first().current_score

        return Response({'Push the buttons': {'group': push_the_buttons_group_max, 'world': push_the_buttons_max, 'count': push_the_buttons_group_count}, 'Alias': {'group': alias_group_max, 'world': alias_max, 'count': alias_group_count}, 'Quiklash': {'group': quiklash_group_max, 'world': quiklash_max, 'count': quiklash_group_count}, 'GeoCache': {'group': geocache_group_max, 'world': geocache_max, 'count': geocache_group_count}, 'total_score': total_score, 'completion_percentage': minigames_completed/TOTAL_MINIGAMES})
