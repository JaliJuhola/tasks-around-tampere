from rest.common.channels import push_event_to_channel

class PushTheButtonsChannels:
    """
    Class for handling socket connections in PushTheButtons minigame
    """
    CHANNEL_NAME = "push-the-buttons"
    EVENT_NEW_PUSH_AVAILABLE = "new-push"
    EVENT_PUSH_COMPLETED = "push-completed"

    @classmethod
    def push_completed_event(cls, player_who_pushed, group_id, current_score):
        push_event_to_channel("{}-{}".format(cls.CHANNEL_NAME, group_id) , cls.EVENT_PUSH_COMPLETED, {'player_id': player_who_pushed, 'current_score': current_score})

    @classmethod
    def new_push_available(cls, target_player, player_who_has_event, group_id, seconds_to_push):
        push_event_to_channel("{}-{}".format(cls.CHANNEL_NAME, group_id), cls.EVENT_NEW_PUSH_AVAILABLE, {'target_player': target_player, 'player_who_has_event': player_who_has_event, 'seconds_to_push':seconds_to_push})
