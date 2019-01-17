from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest.maingame.models import Hotspot, Player, Group
from rest.maingame.serializers import HotspotSerializer, PlayerSerializer, PlayerLocationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest.maingame.channels import WaitingPlayersToJoinChannels
import uuid
from rest.push_the_buttons.channels import PushTheButtonsChannels
from rest.Push_The_Buttons2.models import PushTheButtons2MainGame, PushTheButtons2PlayerGame
from django.utils import timezone
from rest.push_the_buttons.channels import PushTheButtonsChannels
from rest_framework import status


PUSH_THE_BUTTONS_SCORE_TO_ADD = 5
TIME_DECREASES_MILLISECONDS = 180

class PushTheButtons2PlayerView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def patch(self, request):
        score_to_add = request.data['score_to_add']
        player = request.user
        group = player.group
        maingame = PushTheButtons2MainGame.objects.filter(group=group, game_ended=False).last()
        game_object = PushTheButtons2PlayerGame(player=player, maingame=maingame, game_ended=False).last()
        game_object.current_score = game_object.current_score + score_to_add
        game_object.save()
        return Response({'status': True})

    def get(self, request):
        player = request.user
        group = player.group
        maingame = PushTheButtons2MainGame.objects.filter(group=group, game_ended=False).last()
        game_object = PushTheButtons2PlayerGame(player=player, maingame=maingame, game_ended=False).last()
        game_object.game_ended = True
        return Response({'status': True})

    def post(self, request):
        maingame = PushTheButtons2MainGame.objects.filter(group=request.user.group, game_ended=False).last()
        PushTheButtons2PlayerView.objects.create(group=request.user.group, game_ended=False, maingame=maingame)
        return Response({'status': True})

class PushTheButtons2MainView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def patch(self, request):
        player = request.user
        group = player.group
        game_object = PushTheButtons2MainGame.objects.filter(group=group, game_ended=False).last()
        game_object.game_ended = True
        return Response({'status': True})

    def post(self, request):
        maingame = PushTheButtons2MainGame.objects.filter(group=request.user.group, game_ended=False).last()
        PushTheButtons2MainGame.objects.create(group=request.user.group, game_ended=False, maingame = maingame)
        return Response({'status': True})