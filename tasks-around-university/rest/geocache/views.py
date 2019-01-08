from rest.maingame.models import Hotspot, Player, Group
from rest.maingame.serializers import HotspotSerializer, PlayerSerializer, PlayerLocationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest.geocache.channels import GeocacheChannels
from rest.geocache.models import GeocacheMainGame, GeocacheRiddles

GEOCACHE_SCORE_TO_ADD = 5
MAX_TRIES = 6
class GeoCacheMainView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()

    def patch(self, request):
        answer = request.data['answer']
        group = request.user.group
        status = False
        game_object = GeocacheMainGame.objects.filter(group=group).last()
        riddle = GeocacheRiddles.objects.get(id=game_object.riddles_solved + 1)
        if game_object.tries + 1 >= MAX_TRIES:
            game_object.game_ended = True
            game_object.save()
            GeocacheChannels.riddle_solved(group.id, game_object.current_score, None, game_object.tries)
        elif riddle.answer == answer:
            game_object.current_score = game_object.current_score + GEOCACHE_SCORE_TO_ADD
            game_object.riddles_solved = game_object.riddles_solved + 1
            game_object.tries = 0
            game_object.save()
            riddle = GeocacheRiddles.objects.filter(id=game_object.riddles_solved).first()
            if riddle:
                GeocacheChannels.riddle_solved(group.id, game_object.current_score, riddle.riddle, game_object.tries)
            else:
                GeocacheChannels.riddle_solved(group.id, game_object.current_score, None, game_object.tries)
            status = True
        else:
            game_object.tries = game_object.tries + 1
            GeocacheChannels.riddle_solved(group.id, game_object.current_score, riddle.riddle, game_object.tries)
            game_object.save()
        return Response({'status': status})

    def get(self, request):

        game_object= GeocacheMainGame.objects.filter(group=request.user.group.id, game_ended=False).last()
        riddle = GeocacheRiddles.objects.get(id=(game_object.riddles_solved + 1))
        return Response({'riddle': riddle.riddle, 'tries': game_object.tries, 'group_id': request.user.group.id})

    def post(self, request):
        GeocacheMainGame.objects.create(group=request.user.group, game_ended=False)
        return Response({'status': True})


class GeoCacheExitView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def post(self, request):
        group = request.user.group
        game_object = GeocacheMainGame.objects.filter(group=group, game_ended=False).last()
        game_object.game_ended = True
        game_object.save()
        GeocacheChannels.riddle_solved(group.id, game_object.current_score, None, 0)
        return Response({'status': True})
