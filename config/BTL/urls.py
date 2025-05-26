from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('doctor/<slug:slug>/', views.doctor_detail, name='doctor_detail'),
    path('adhd/', views.adhd_view, name='adhd'),
    path('social_anxiety/', views.social_anxiety_view, name='social_anxiety'),
    path('autism/', views.autism_view, name='autism'),
]
