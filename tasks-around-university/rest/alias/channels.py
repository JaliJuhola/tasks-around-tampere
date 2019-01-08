from rest.common.channels import push_event_to_channel

class AliasChannels:
    """
    Class for handling socket connections in Geocache minigame
    """
    CHANNEL_NAME = "alias"
    EVENT_NEW_RIDDLE = "new-word"

    @classmethod
    def new_word(cls, group_id, words_right, currentword, current_score, target):
        push_event_to_channel("{}-{}".format(cls.CHANNEL_NAME, group_id) , cls.EVENT_NEW_RIDDLE, {'riddle': currentword, 'current_score': current_score, 'words_right': words_right, 'target': target})
