from django.conf import settings
from django.urls.conf import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter, SimpleRouter

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router

urlpatterns = [
    path("auth-token/", obtain_auth_token),
] + router.urls
