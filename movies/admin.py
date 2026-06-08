"""
Filmler admin paneli yapılandırması.
"""

from django.contrib import admin
from .models import Movie


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    """Film admin görünümü."""
    list_display = ["title", "year", "mood_tag", "order"]
    list_editable = ["order"]
    search_fields = ["title"]
