from django.conf.urls import url
from django.urls import path
from rest.quiklash import views
from rest.push_the_buttons.views import PushTheButtonView
urlpatterns = [
    path('api/qa/game/start', views.QuicklashMainGame.as_view()),
    path('api/qa/question/new', views.QuiklashQuestionListView.as_view()),
    path('api/qa/question/answer', views.QuiklashQuestionAnswer.as_view()),
    # path('api/qa/voting', PushTheButtonView.as_view()),
    # path('api/qa/vote', views.PlayerView.as_view()),
]