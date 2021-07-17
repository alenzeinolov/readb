from django.conf import settings
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter, SimpleRouter
from rest_framework_simplejwt.views import token_obtain_pair, token_refresh

from apps.books.views import BookViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register('books', BookViewSet)

urlpatterns = [
    path("auth-token/", obtain_auth_token, name="obtain_auth_token"),
    path("token/", token_obtain_pair, name="token_obtain_pair"),
    path("token/refresh/", token_refresh, name="token_refresh"),
] + router.urls
