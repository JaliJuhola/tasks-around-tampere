from django.conf.urls import url
from django.urls import path
from rest.maingame import views
from rest.push_the_buttons.views import PushTheButtonView
urlpatterns = [
    path('api/auth/', views.AuthView.as_view()),
    path('api/group/player', views.PlayerGroupView.as_view()),
    path('api/push_the_buttons', PushTheButtonView.as_view()),
    path('api/me', views.PlayerView.as_view()),
    path('api/group/create', views.GroupView.as_view()),
    path('api/lobby/close', views.LobbyExitView.as_view()),
    path('api/lobby', views.LobbyView.as_view()),
    path('api/avatar', views.AvatarView.as_view()),
    path('api/location', views.PlayerLocationView.as_view()),
    path('api/minigame/progression', views.MinigameProgressionView.as_view()),
]