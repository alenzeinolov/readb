from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'date_joined',
            'last_login',
            'is_staff',
        ]