"""
İlham panosu URL yönlendirmeleri.
"""

from django.urls import path
from . import views

app_name = "inspiration"

urlpatterns = [
    path("", views.board, name="board"),
]
