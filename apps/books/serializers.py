from django.utils.functional import cached_property
from library.models import UserBook
from rest_framework import serializers

from .models import Author, Book


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ["full_name"]


class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)
    in_library = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ["id", "title", "isbn", "authors", "in_library", "published_on"]

    @cached_property
    def user(self):
        return self.context["request"].user

    def get_in_library(self, obj):
        return UserBook.objects.filter(book=obj, user=self.user).exists()
