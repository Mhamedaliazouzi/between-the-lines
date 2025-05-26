from django.shortcuts import render, get_object_or_404
from .models import Doctor

def index(request):
    doctors = Doctor.objects.all()
    return render(request, 'BTL/index.html', {'doctors': doctors})

def doctor_detail(request, slug):
    doctor = get_object_or_404(Doctor, slug=slug)
    return render(request, 'BTL/doctor_detail.html', {'doctor': doctor})

def adhd_view(request):
    return render(request, 'BTL/adhd.html')

def social_anxiety_view(request):
    return render(request, 'BTL/social_anxiety.html')

def autism_view(request):
    return render(request, 'BTL/autism.html')
