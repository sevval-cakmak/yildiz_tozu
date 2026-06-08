"""
Film uygulaması modelleri – Film kartları ve afişler.
"""

from django.db import models


class Movie(models.Model):
    """Film bilgilerini tutan model."""
    
    title = models.CharField(max_length=200, verbose_name="Film Adı")
    description = models.TextField(verbose_name="Kısa Açıklama")
    poster = models.ImageField(
        upload_to="movies/posters/", 
        blank=True, null=True,
        verbose_name="Afiş Görseli"
    )
    year = models.PositiveIntegerField(blank=True, null=True, verbose_name="Yıl")
    mood_tag = models.CharField(max_length=100, blank=True, verbose_name="Ruh Hali Etiketi")
    order = models.PositiveIntegerField(default=0, verbose_name="Sıra")
    
    class Meta:
        ordering = ["order", "title"]
        verbose_name = "Film"
        verbose_name_plural = "Filmler"
    
    def __str__(self):
        return f"{self.title} ({self.year})"
