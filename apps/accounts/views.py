from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from apps.accounts.serializers import UserSerializer

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.none()
    serializer_class = UserSerializer

    @action(methods=['get'], detail=False)
    def me(self, request, **kwargs):
        user = get_object_or_404(User, pk=request.user.pk)
        serializer = UserSerializer(instance=user)
        return Response(serializer.data)
