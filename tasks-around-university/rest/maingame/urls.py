from django.conf.urls import url
from django.urls import path
from rest.maingame import views
from rest.push_the_buttons.views import PushTheButtonView
urlpatterns = [
    #url(r'^test$', counter_view, None, 'test_url'),
    # path('api/gameworld/hotspots/', views.hotspot_list),
    # path('api/gameworld/hotspots/<int:pk>/', views.hotspot_detail),
    # path('api/players/locations/<int:pk>/', views.player_location),
    path('api/auth/', views.AuthView.as_view()),
    path('api/group/player', views.PlayerGroupView.as_view()),
    # path('pusher/auth', views.pusher_authentication),
    path('api/push_the_buttons', PushTheButtonView.as_view()),
    path('api/me', views.PlayerView.as_view()),
    path('api/group/create', views.GroupView.as_view())
]