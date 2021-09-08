from books.models import Book
from django.conf import settings
from django.db import models
from model_utils import Choices
from model_utils.fields import MonitorField
from model_utils.models import StatusModel, TimeStampedModel


class UserBook(StatusModel, TimeStampedModel):
    STATUS = Choices(
        ("WANT_TO_READ", "Want to read"),
        ("READING", "Reading"),
        ("READ", "Read"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="user_books",
        related_query_name="user_book",
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name="user_books",
        related_query_name="user_book",
    )

    want_to_read_at = MonitorField(monitor="status", when=["WANT_TO_READ"])
    reading_at = MonitorField(monitor="status", when=["READING"])
    read_at = MonitorField(monitor="status", when=["READ"])

    class Meta:
        ordering = ["created"]

    def __str__(self):
        return f"{self.user} - {self.book}"
