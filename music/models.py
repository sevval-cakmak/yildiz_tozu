"""
Müzik uygulaması modelleri – Şarkı kartları.
"""

from django.db import models


class Song(models.Model):
    """Şarkı bilgilerini tutan model."""
    
    title = models.CharField(max_length=200, verbose_name="Şarkı Adı")
    artist = models.CharField(max_length=200, verbose_name="Sanatçı")
    spotify_url = models.URLField(blank=True, null=True, verbose_name="Spotify Linki")
    spotify_track_id = models.CharField(
        max_length=100, blank=True, null=True, 
        verbose_name="Spotify Parça ID (embed için)"
    )
    emoji = models.CharField(max_length=10, default="🎵", verbose_name="Emoji")
    mood_tag = models.CharField(max_length=100, blank=True, verbose_name="Ruh Hali Etiketi")
    order = models.PositiveIntegerField(default=0, verbose_name="Sıra")
    
    class Meta:
        ordering = ["order", "title"]
        verbose_name = "Şarkı"
        verbose_name_plural = "Şarkılar"
    
    def __str__(self):
        return f"{self.title} – {self.artist}"
