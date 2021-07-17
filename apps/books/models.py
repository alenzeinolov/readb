from django.conf import settings
from django.db import models


class Book(models.Model):
    class Status(models.TextChoices):
        WANT_TO_READ = 'WANT_TO_READ', 'Want to read'
        READING = 'READING', 'Reading'
        READ = 'READ', 'Read'

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='books', related_query_name='book')

    name = models.CharField(max_length=250)
    status = models.CharField(choices=Status.choices, max_length=50)

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
