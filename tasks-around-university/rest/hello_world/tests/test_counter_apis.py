from rest_framework.test import APITestCase
from rest.hello_world.models import Counter
import requests
from django.conf import settings
from rest_framework.test import APIRequestFactory

class CounterTestCase(APITestCase):
    """
    Hello world like test case in testing Counter related stuff
    """
    def setUp(self):
        Counter.objects.create()
        Counter.objects.create()

    def test_database_connections(self):
        """
        Test database connecetions at basic level
        """
        self.assertEqual(Counter.objects.count(), 2)

    def test_rest_api(self):
        """
        Test Counter related REST apis
        """
        Counter.objects.create()
        # Test get method
        data = self.client.get(f"/test").data
        self.assertEqual(data['count'], 0, "Counters GET request test failed in count")
        self.assertEqual(data['id'], 5, "Counters GET request test failed in ID")
        # Test patch method
        data = self.client.patch(f"/test").data
        self.assertEqual(data['count'], 1, "Counters PATCH request test failed in count")
        self.assertEqual(data['id'], 5, "Counters PATCH request test failed in ID")
        # Test post method
        data = self.client.post(f"/test").data
        self.assertEqual(data['count'], 0, "Counters POST request test failed in count")
        self.assertEqual(data['id'], 6, "Counters POST request test failed in ID")
        self.assertEqual(Counter.objects.count(), 4)