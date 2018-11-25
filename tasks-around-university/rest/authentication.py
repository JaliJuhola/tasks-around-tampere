from rest_framework import authentication
from rest_framework import exceptions
from rest.maingame.models import Player

class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        if "api/auth" not in request.path:
            player_token = request.META.get('HTTP_AUTHORIZATION')
            print("auth: " + player_token)
            if not player_token:
                raise exceptions.AuthenticationFailed('No authentication token given!')

            try:
                player = Player.objects.get(token=player_token)
            except(Player.DoesNotExist):
                raise exceptions.AuthenticationFailed('No such user')

            return (player, None)

        return (None, None)