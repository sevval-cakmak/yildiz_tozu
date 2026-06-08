"""
İlham panosu view'ları.
"""

from django.shortcuts import render
from .models import InspirationImage


def board(request):
    """İlham panosu sayfası."""
    images = InspirationImage.objects.all()
    return render(request, "inspiration/board.html", {"images": images})
