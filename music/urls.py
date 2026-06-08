"""
Müzik uygulaması URL yönlendirmeleri.
"""

from django.urls import path
from . import views

app_name = "music"

urlpatterns = [
    path("", views.music_list, name="list"),
]
