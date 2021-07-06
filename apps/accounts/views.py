from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(pk=self.request.user.pk)
        return qs
