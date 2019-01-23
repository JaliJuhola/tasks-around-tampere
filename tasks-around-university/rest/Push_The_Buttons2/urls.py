from django.urls import path
from rest.Push_The_Buttons2.views import PushTheButtons2MainView, PushTheButtons2PlayerView

urlpatterns = [
    path('api/push_the_buttons2', PushTheButtons2MainView.as_view()),
    path('api/push_the_buttons2/player', PushTheButtons2PlayerView.as_view())
]