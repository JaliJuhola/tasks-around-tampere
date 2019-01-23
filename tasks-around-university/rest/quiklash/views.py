from django.http import HttpResponse, JsonResponse
#from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest.maingame.models import Hotspot, Player, Group
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import uuid
from rest.quiklash import models

class QuicklashMainGame(APIView):

    def post(self, request):
        group = request.user.group
        models.QuiklashMainGame.objects.create(group=group, game_ended=False)
        return Response({
            'status': True,
        })
class QuiklashQuestionListView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = models.QuiklashQuestion.objects.all()

    def get(self, request):
        group_id = request.user.group
        quiklash_game = models.QuiklashMainGame.objects.filter(group=group_id).last()
        already_answered = models.QuiklashAnswer.objects.filter(game=quiklash_game).only('id')
        random_question_1 = models.QuiklashQuestion.objects.filter(id__not_in=already_answered).order_by('?').first()
        already_answered.append(random_question_1.id)
        random_question_2 = models.QuiklashQuestion.objects.filter(id__not_in=already_answered).order_by('?').first()
        if not random_question_1 or not random_question_2:
            return Response({'message': 'there are no enough questions left!'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'question': [random_question_1.question,random_question_2.question],
	        'id': [random_question_1.id,random_question_2.id]
        })

class QuiklashQuestionAnswer(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = models.QuiklashQuestion.objects.all()

    def post(self, request):
        group_id = request.user.id
        question_id = request.questionID
        question = models.QuiklashQuestion.objects.get(id=question_id)
        quiklash_game = models.QuiklashMainGame.objects.filter(group=group_id).last()
        models.QuiklashAnswer.create(answer=request.answer, player=request.user, game=quiklash_game, question=question)
        return Response({
            'status': True,
        })

