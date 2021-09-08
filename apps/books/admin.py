from books.models import Author, Book
from django.contrib import admin


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("full_name",)
    search_fields = ("full_name",)
    fields = ("full_name",)


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "isbn", "published_on")
    search_fields = ("title", "isbn")
    fields = ("title", "authors", "isbn", "published_on")
    filter_horizontal = ("authors",)
