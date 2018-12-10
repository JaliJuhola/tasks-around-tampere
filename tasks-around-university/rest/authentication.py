from rest_framework import authentication
from rest_framework import exceptions
from rest.maingame.models import Player, Group

class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        if "api/auth" not in request.path:
            player_token = request.META.get('HTTP_AUTHORIZATION')
            print(type(player_token))
            print("auth: " + player_token)
            if not player_token:
                print("no token")
                raise exceptions.AuthenticationFailed('No authentication token given!')
            try:
                player = Player.objects.filter(token=str(player_token))
                print(player.__dict__)
            except(Player.DoesNotExist):
                print("no such user")
                raise exceptions.AuthenticationFailed('No such user')

            return (player, None)

        return (None, None)