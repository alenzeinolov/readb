from library.models import UserBook
from library.serializers import UserBookReadSerializer, UserBookWriteSerializer
from rest_framework import viewsets
from tools.mixins import ReadWriteSerializerMixin


class UserBookViewSet(ReadWriteSerializerMixin, viewsets.ModelViewSet):
    queryset = UserBook.objects.all()
    read_serializer_class = UserBookReadSerializer
    write_serializer_class = UserBookWriteSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(user=self.request.user)
        return queryset
