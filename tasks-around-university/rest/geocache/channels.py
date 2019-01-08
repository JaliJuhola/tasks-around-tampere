from rest.common.channels import push_event_to_channel

class GeocacheChannels:
    """
    Class for handling socket connections in Geocache minigame
    """
    CHANNEL_NAME = "geocache"
    EVENT_NEW_RIDDLE = "new-riddle"

    @classmethod
    def riddle_solved(cls, group_id, current_score, riddle, tries):
        push_event_to_channel("{}-{}".format(cls.CHANNEL_NAME, group_id) , cls.EVENT_NEW_RIDDLE, {'riddle': riddle, 'current_score': current_score, 'tries': tries})
