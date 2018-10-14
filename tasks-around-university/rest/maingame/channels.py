from rest.common.channels import push_event_to_channel

class WaitingPlayersToJoinChannels:
    """
    Class for handling socket connections for waiting players to join the game
    """
    CHANNEL_NAME = "waiting-players-to-join"
    EVENT_PLAYER_JOINED = "joined"

    @classmethod
    def new_push_available(cls, player_name, players_on_game, group_id):
        push_event_to_channel("{}-{}".format(cls.CHANNEL_NAME, group_id), cls.EVENT_PLAYER_JOINED, {'player_name': player_name, 'players_on_game': players_on_game})