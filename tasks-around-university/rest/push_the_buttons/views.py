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
from rest.maingame.channels import WaitingPlayersToJoinChannels
import uuid
from rest.push_the_buttons.channels import PushTheButtonsChannels
from rest.push_the_buttons.models import PushTheButtonsMainGame
from django.utils import timezone
from rest.alias.channels import AliasChannels

PUSH_THE_BUTTONS_SCORE_TO_ADD = 1
SECONDS_TO_PUSH = 10
TIME_DECREASES_MILLISECONDS = 180

class PushTheButtonView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def patch(self, request):
        group_id = request.user.group.id
        try:
            group = Group.objects.get(id=group_id)
            game_object = PushTheButtonsMainGame.objects.filter(group=group, game_ended=False).last()
            player = request.user
            if game_object.next_to_click:
                if player.id != game_object.next_to_click.id or game_object.next_push_before < timezone.now():
                    game_object.game_ended = True
                    game_object.save()
                    PushTheButtonsChannels.push_completed_event(None, group.id, game_object.current_score)
                    return Response({'message': 'game ended'}, status=status.HTTP_400_BAD_REQUEST)

            random_player_1 = Player.objects.filter(group=group).order_by('?').first()
            random_player_2 = Player.objects.filter(group=group).order_by('?').first()
            game_object.next_to_click = random_player_1
            game_object.next_push_before = timezone.now() + timezone.timedelta(seconds=SECONDS_TO_PUSH) - timezone.timedelta(milliseconds=game_object.current_score*TIME_DECREASES_MILLISECONDS)
            game_object.current_score = game_object.current_score + PUSH_THE_BUTTONS_SCORE_TO_ADD
            game_object.save()
            PushTheButtonsChannels.push_completed_event(player.id, group.id, game_object.current_score)
            PushTheButtonsChannels.new_push_available(random_player_1.id, random_player_2.id, group.id, (((SECONDS_TO_PUSH * 1000) - TIME_DECREASES_MILLISECONDS * game_object.current_score)))
        except Group.DoesNotExist:
           return Response({'message': 'invalid group_id'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({ 'player_id': request.user.id, 'player_name': request.user.name, 'group_name': request.user.group.name, 'group_id': request.user.group.id}, status=status.HTTP_201_CREATED)

    def get(self, request):
        group_id = request.user.group.id
        group = Group.objects.get(id=group_id)
        game_object = PushTheButtonsMainGame.objects.filter(group=group, game_ended=False).last()
        game_object.game_ended = True
        game_object.save()
        PushTheButtonsChannels.push_completed_event(None, group.id, game_object.current_score)
        return Response({'status': True})

    def post(self, request):
        group_id = request.user.group.id
        group = Group.objects.get(id=group_id)
        PushTheButtonsMainGame.objects.create(group=group)
        return Response({'status': True})
