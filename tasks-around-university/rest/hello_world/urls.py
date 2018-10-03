from django.conf.urls import url
from rest.hello_world.views import counter_view

urlpatterns = [
    url(r'^test$', counter_view, None, 'test_url'),
]
