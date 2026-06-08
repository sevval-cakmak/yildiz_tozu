"""
Core uygulaması view'ları – Ana sayfa.
"""

from django.shortcuts import render


def home(request):
    """Ana sayfa görünümü."""
    return render(request, "core/home.html")
