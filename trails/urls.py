from django.urls import path
from .views import TrailListCreateView, TrailDetailView

urlpatterns = [
    path('', TrailListCreateView.as_view()),
    path('<int:pk>/', TrailDetailView.as_view())
]