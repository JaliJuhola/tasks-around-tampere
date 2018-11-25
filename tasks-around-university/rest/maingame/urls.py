from django.conf.urls import url
from django.urls import path
from rest.maingame import views

urlpatterns = [
    #url(r'^test$', counter_view, None, 'test_url'),
    path('api/gameworld/hotspots/', views.hotspot_list),
    path('api/gameworld/hotspots/<int:pk>/', views.hotspot_detail),
    path('api/players/locations/<int:pk>/', views.player_location),
    path('api/auth/', views.AuthView.as_view()),
    path('api/group/player', views.PlayerGroupView.as_view()),
    path('pusher/auth', views.pusher_authentication),
]