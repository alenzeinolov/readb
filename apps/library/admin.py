from django.contrib import admin
from library.models import UserBook


@admin.register(UserBook)
class UserBookAdmin(admin.ModelAdmin):
    pass
