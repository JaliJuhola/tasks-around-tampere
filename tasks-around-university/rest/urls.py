from django.conf.urls import url, include

urlpatterns = [
    url(r'^', include('rest.hello_world.urls')),
    url(r'^', include('rest.maingame.urls')),
    url(r'^', include('rest.push_the_buttons.urls')),
    url(r'^', include('rest.quiklash.urls')),
    url(r'^', include('rest.alias.urls')),
    url(r'^', include('rest.geocache.urls')),
]
