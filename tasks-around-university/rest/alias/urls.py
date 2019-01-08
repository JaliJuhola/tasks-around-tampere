from django.conf.urls import url
from django.urls import path
from rest.alias import views
urlpatterns = [
    path('api/alias/score', views.AliasWordListView.as_view()),
    path('api/alias/start', views.AliasMainGameView.as_view()),
    path('api/alias/end', views.AliasCloseGameView.as_view()),
]