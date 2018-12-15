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

PUSH_THE_BUTTONS_SCORE_TO_ADD = 1
SECONDS_TO_PUSH = 5

class PushTheButtonView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def patch(self, request):
        group_id = request.user.group.id
        if not group_id:
            return Response({'message': 'both id fields are required!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            group = Group.objects.get(id=group_id)
            game_object, created = PushTheButtonsMainGame.objects.get_or_create(group=group)
            player = request.user
            if game_object.next_to_click and not created:
                if player.id != game_object.next_to_click or game_object.game_ended:
                    game_object.game_ended = True
                    game_object.save()
                    PushTheButtonsChannels.push_completed_event(None, group.id, game_object.current_score)
                    return Response({'message': 'game ended'}, status=status.HTTP_400_BAD_REQUEST)
                game_object.current_score = game_object.current_score + PUSH_THE_BUTTONS_SCORE_TO_ADD

            random_player_1 = Player.objects.filter(group=group).order_by('?').first()
            random_player_2 = Player.objects.filter(group=group).order_by('?').first()
            game_object.next_to_click = random_player_1
            game_object.current_score = game_object.current_score + PUSH_THE_BUTTONS_SCORE_TO_ADD
            game_object.save()
            PushTheButtonsChannels.push_completed_event(player.id, group.id, game_object.current_score)
            PushTheButtonsChannels.new_push_available(random_player_1.id, random_player_2.id, group.id, SECONDS_TO_PUSH)
        except Group.DoesNotExist:
           return Response({'message': 'invalid group_id'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({ 'player_id': request.user.id, 'player_name': request.user.name, 'group_name': request.user.group.name, 'group_id': request.user.group.id}, status=status.HTTP_201_CREATED)

    def get(self, request):
        group_id = request.user.group.id
        if not group_id:
            return Response({'message': 'both id fields are required!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            group = Group.objects.get(id=group_id)
            game_object = PushTheButtonsMainGame.objects.get_or_create(group=group)
            game_object.game_ended = True
            game_object.save()
            PushTheButtonsChannels.push_completed_event(None, group.id, game_object.current_score)
        except Group.DoesNotExist:
           return Response({'message': 'invalid group_id'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({status: True})

    def get(self, request):
        group_id = request.user.group.id
        if not group_id:
            return Response({'message': 'both id fields are required!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            group = Group.objects.get(id=group_id)
            game_object = PushTheButtonsMainGame.objects.get_or_create(group=group)
            game_object.game_ended = True
            game_object.save()
            PushTheButtonsChannels.push_completed_event(None, group.id, game_object.current_score)
        except Group.DoesNotExist:
           return Response({'message': 'invalid group_id'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({status: True})

class PushTheButtonStartView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def post(self, request):
        group_id = request.data['group_id']
        if not group_id:
            return Response({'message': 'both id fields are required!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            group = Group.objects.get(id=group_id)
            game_object = PushTheButtonsMainGame.objects.get_or_create(group=group)
            game_object.game_ended = False
            game_object.save()
            PushTheButtonsChannels.push_completed_event(None, group.id)
        except Group.DoesNotExist:
           return Response({'message': 'invalid group_id'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({status: True})