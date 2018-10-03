from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest.hello_world.models import Counter
from django.http import JsonResponse
from rest.hello_world.serializers import CounterSerializer


def get_last_counter_response():
    counter = Counter.objects.last()
    if not counter:
        return JsonResponse({
            'error': u'No Counter found'},
            status=status.HTTP_400_BAD_REQUEST
        )
    serializer = CounterSerializer(counter)
    print(serializer.data)
    return JsonResponse(serializer.data)


@api_view(['GET', 'POST', 'PATCH'])
def counter_view(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'POST':
        Counter.objects.create()
    if request.method == 'PATCH':
        counter = Counter.objects.last()
        counter.count = counter.count + 1
        counter.save()
    return get_last_counter_response()


