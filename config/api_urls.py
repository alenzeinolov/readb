from django.conf import settings
from django.urls.conf import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter, SimpleRouter

from accounts.views import UserViewSet
from books.views import BookViewSet
from library.views import UserBookViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register('books', BookViewSet)
router.register('user-books', UserBookViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path("auth-token/", obtain_auth_token),
] + router.urls
