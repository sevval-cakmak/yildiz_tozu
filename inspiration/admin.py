"""
İlham panosu admin paneli yapılandırması.
"""

from django.contrib import admin
from .models import InspirationImage


@admin.register(InspirationImage)
class InspirationImageAdmin(admin.ModelAdmin):
    """İlham görseli admin görünümü."""
    list_display = ["caption", "order"]
    list_editable = ["order"]
