from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
#from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest.maingame.models import Hotspot, Player, Group, Player_Group
from rest.maingame.serializers import HotspotSerializer, PgSerializer, PlayerLocationSerializer, PlayerGroupLocationSerializer

def hotspot_list(request):
    if request.method == 'GET':
        hotspots = Hotspot.objects.all()
        serializer = HotspotSerializer(hotspots, many=True)
        return JsonResponse(serializer.data, safe=False)

def pg_list(request):
    if request.method == 'GET':
        hotspots = Player_Group.objects.all()
        serializer = PgSerializer(hotspots, many=True)
        return JsonResponse(serializer.data, safe=False)
        
def hotspot_detail(request, pk):
    try:
        hotspot = Hotspot.objects.get(pk=pk)
    except Hotspot.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        serializer = HotspotSerializer(hotspot)
        return JsonResponse(serializer.data)

def player_location(request, pk):
    try:
        player = Player.objects.get(pk=pk)
    except Player.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        serializer = PlayerLocationSerializer(player)
        return JsonResponse(serializer.data)

def player_group_location(request, pk):
    players = [p.player for p in Player_Group.objects.filter(group=pk)]
    if not players: #Player_Group.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        serializer = PlayerLocationSerializer(players, many=True)
        return JsonResponse(serializer.data, safe=False)

