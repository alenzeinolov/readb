from books.models import Book
from books.serializers import BookSerializer
from rest_framework import filters, viewsets


class BookViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "isbn", "authors__full_name"]
