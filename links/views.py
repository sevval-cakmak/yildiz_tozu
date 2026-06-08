"""
Bağlantılar view'ları.
"""

from django.shortcuts import render
from .models import SocialLink


def links_page(request):
    """Bağlantılar sayfası."""
    links = SocialLink.objects.all()
    return render(request, "links/links.html", {"links": links})
