from django.http import HttpResponse, JsonResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest.maingame.models import Hotspot, Player, Group
from rest_framework.views import APIView
from rest_framework.response import Response
import uuid
from rest.alias import models
from rest.alias.channels import AliasChannels

class AliasMainGameView(APIView):

    def post(self, request):
        group = request.user.group
        models.AliasMainGame.objects.create(group=group)
        return Response({
            'status': True,
        })

class AliasCloseGameView(APIView):

    def post(self, request):
        group = request.user.group
        game_object = models.AliasMainGame.objects.filter(group=group, game_ended=False).last()
        AliasChannels.new_word(request.user.group.id, game_object.words_right, None, game_object.current_score, 1)
        game_object.game_ended = True
        game_object.save()
        return Response({
            'status': True,
        })

class AliasWordListView(APIView):
    """
    def new_word(cls, group_id, words_right, currentword, current_score, target):
    """
    queryset = models.AliasWords.objects.all()

    def patch(self, request):
        game_object = models.AliasMainGame.objects.filter(group=request.user.group).last()
        if game_object.game_ended:
            AliasChannels.new_word(request.user.group.id, game_object.words_right, None, game_object.current_score, 1)
        word = models.AliasWords.objects.all().order_by('?').first()
        game_object.words_right = game_object.words_right + 1
        game_object.current_score = game_object.current_score + 1
        game_object.save()
        explainer = Player.objects.filter(group=request.user.group).order_by('?').first()
        AliasChannels.new_word(request.user.group.id, game_object.words_right, word.word, game_object.current_score, explainer.id)
        return Response({
            'status': True
        })
    def get(self, request):
        word = models.AliasWords.objects.all().order_by('?').first()
        game_object = models.AliasMainGame.objects.filter(group=request.user.group).last()
        game_object.save()
        explainer = Player.objects.filter(group=request.user.group).order_by('?').first()
        AliasChannels.new_word(request.user.group.id, game_object.words_right, word.word, game_object.current_score, explainer.id)
        return Response({
            'status': True
        })

