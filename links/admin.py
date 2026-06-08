"""
Bağlantılar admin paneli yapılandırması.
"""

from django.contrib import admin
from .models import SocialLink


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    """Sosyal bağlantı admin görünümü."""
    list_display = ["name", "url", "order"]
    list_editable = ["order"]
