import pusher
from django.conf import settings


if settings.DEBUG:
    class MockPusher:
        def trigger(self, channel, event, data):
            print("event: " + event + " fired to " + channel, flush=True)
    PUSHER_CLIENT = MockPusher()
else:
    PUSHER_CLIENT = pusher.Pusher(
        app_id=settings.PUSHER['APP_ID'],
        key=settings.PUSHER['KEY'],
        secret=settings.PUSHER['SECRET'],
        cluster=settings.PUSHER['CLUSTER'],
        ssl=settings.PUSHER['SSL']
    )

def push_event_to_channel(channel, event, data):
    # If implementation of channels are changed this should be
    PUSHER_CLIENT.trigger(channel, event, data)






