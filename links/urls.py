"""
Bağlantılar URL yönlendirmeleri.
"""

from django.urls import path
from . import views

app_name = "links"

urlpatterns = [
    path("", views.links_page, name="page"),
]
