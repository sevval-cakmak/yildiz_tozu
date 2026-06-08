"""
Müzik admin paneli yapılandırması.
"""

from django.contrib import admin
from .models import Song


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    """Şarkı admin görünümü."""
    list_display = ["title", "artist", "mood_tag", "order"]
    list_editable = ["order"]
    search_fields = ["title", "artist"]
    list_filter = ["mood_tag"]
