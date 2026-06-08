"""
Filmler uygulaması view'ları.
"""

from django.shortcuts import render
from .models import Movie


def movie_list(request):
    """Film listesi sayfası."""
    movies = Movie.objects.all()
    return render(request, "movies/movie_list.html", {"movies": movies})
