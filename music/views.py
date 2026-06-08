"""
Müzik uygulaması view'ları – Şarkı listesi.
"""

from django.shortcuts import render
from .models import Song


def music_list(request):
    """Şarkı listesi sayfası."""
    songs = Song.objects.all()
    return render(request, "music/music_list.html", {"songs": songs})
