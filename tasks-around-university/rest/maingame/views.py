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

@api_view(['GET'])
def hotspot_list(request):
    hotspots = Hotspot.objects.all()
    serializer = HotspotSerializer(hotspots, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def hotspot_detail(request, pk):
    try:
        hotspot = Hotspot.objects.get(pk=pk)
    except Hotspot.DoesNotExist:
        return Response({'message': 'hotspot not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = HotspotSerializer(hotspot)
    return Response(serializer.data)

@api_view(['GET'])
def player_location(request, pk):
    try:
        player = Player.objects.get(pk=pk)
    except Player.DoesNotExist:
        return Response({'message': 'Player not found'},status=status.HTTP_404_NOT_FOUND)

    serializer = PlayerLocationSerializer(player)
    return Response(serializer.data)


class PlayerView(APIView):
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

        serializer = PlayerSerializer(player)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PlayerSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PlayerGroupView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def get(self, request, pk):

        players = Player.objects.filter(group__id=pk)
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)
