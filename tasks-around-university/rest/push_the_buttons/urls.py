from django.conf.urls import url
from django.urls import path
from rest.maingame import views
from rest.push_the_buttons.views import PushTheButtonView
urlpatterns = [
    path('api/push_the_buttons', PushTheButtonView.as_view())
]