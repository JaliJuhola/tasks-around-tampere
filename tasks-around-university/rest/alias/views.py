from django.http import HttpResponse, JsonResponse
#from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest.maingame.models import Hotspot, Player, Group
from rest_framework.views import APIView
from rest_framework.response import Response
import uuid
from rest.alias import models

class AliasMainGameView(APIView):

    def post(self, request):
        group = request.user.group
        models.AliasMainGame.objects.create(group=group)
        return Response({
            'status': True,
        })

class AliasWordListView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = models.AliasWords.objects.all()

    def get(self, request):
        words = models.AliasWords.objects.filter("?")[:5]
        wordlist = []
        for word in words:
            wordlist.append(word.word)

        return Response({
            'words': wordlist,
        })

class AliasScoreView(APIView):
    def post(self, request):
        score = request.data['score']
        item, created = models.AliasScore.get_or_create(player=request.player)
        item.score = item.score + score
        item.save()
        return Response({
            'status': True,
        })
