from django.conf.urls import url
from django.urls import path
from rest.maingame import views
from rest.geocache.views import GeoCacheExitView, GeoCacheMainView
urlpatterns = [
    path('api/geocache/', GeoCacheMainView.as_view()),
    path('api/geocache/exit/', GeoCacheExitView.as_view()),
]