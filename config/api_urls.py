from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter, SimpleRouter
from rest_framework_simplejwt.views import token_obtain_pair, token_refresh

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

urlpatterns = [
    path("api/token/", token_obtain_pair, name="token_obtain_pair"),
    path("api/token/refresh/", token_refresh, name="token_refresh"),
] + router.urls
