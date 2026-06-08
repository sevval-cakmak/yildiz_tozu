"""
Bağlantılar uygulaması modelleri – Sosyal medya linkleri.
"""

from django.db import models


class SocialLink(models.Model):
    """Sosyal medya veya dış bağlantı kartı."""
    
    name = models.CharField(max_length=100, verbose_name="Platform Adı")
    url = models.URLField(verbose_name="Link")
    icon_svg = models.TextField(blank=True, verbose_name="SVG İkon (opsiyonel)")
    emoji = models.CharField(max_length=10, default="🔗", verbose_name="Emoji İkon")
    accent_color = models.CharField(max_length=20, default="#b8a9d9", verbose_name="Vurgu Rengi")
    description = models.CharField(max_length=200, blank=True, verbose_name="Kısa Açıklama")
    order = models.PositiveIntegerField(default=0, verbose_name="Sıra")
    
    class Meta:
        ordering = ["order"]
        verbose_name = "Sosyal Bağlantı"
        verbose_name_plural = "Sosyal Bağlantılar"
    
    def __str__(self):
        return self.name
