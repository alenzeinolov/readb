from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from apps.books.models import Book


class BookSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=CurrentUserDefault(),
    )

    class Meta:
        model = Book
        fields = ['id', 'user', 'name', 'status', 'created', 'modified']
        read_only_fields = ['created', 'modified']
