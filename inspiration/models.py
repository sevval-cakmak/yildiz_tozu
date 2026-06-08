"""
İlham Panosu modelleri – Pinterest tarzı görsel koleksiyonu.
"""

from django.db import models


class InspirationImage(models.Model):
    """İlham panosu görseli."""
    
    image = models.ImageField(
        upload_to="inspiration/", 
        verbose_name="Görsel"
    )
    caption = models.CharField(max_length=200, blank=True, verbose_name="Açıklama")
    pinterest_url = models.URLField(blank=True, null=True, verbose_name="Pinterest Linki")
    order = models.PositiveIntegerField(default=0, verbose_name="Sıra")
    
    class Meta:
        ordering = ["order"]
        verbose_name = "İlham Görseli"
        verbose_name_plural = "İlham Görselleri"
    
    def __str__(self):
        return self.caption or f"Görsel {self.pk}"
