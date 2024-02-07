from django.urls import path
from .views import HikerCreateView, HikerDestroyView

urlpatterns = [
    path('', HikerCreateView.as_view()),
    path('<int:pk>/', HikerDestroyView.as_view())
]