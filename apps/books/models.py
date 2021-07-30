from django.db import models


class Author(models.Model):
    full_name = models.CharField(max_length=500)

    class Meta:
        ordering = ["full_name"]

    def __str__(self):
        return self.full_name


class Book(models.Model):
    title = models.CharField(max_length=500)
    isbn = models.CharField(unique=True, max_length=50)
    authors = models.ManyToManyField(
        Author,
        related_name="books",
        related_query_name="book",
    )
    published_on = models.DateField()

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title
