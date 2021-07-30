from rest_framework import serializers
from .models import UserBook
from books.serializers import BookSerializer


class UserBookReadSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    book = BookSerializer()
    status_display = serializers.CharField(source='get_status_display')

    class Meta:
        model = UserBook
        fields = ['id', 'user', 'book', 'status', 'status_display', 'want_to_read_at', 'reading_at']


class UserBookWriteSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    status_display = serializers.CharField(source='get_status_display')

    class Meta:
        model = UserBook
        fields = ['id', 'user', 'book', 'status', 'want_to_read_at', 'reading_at']
