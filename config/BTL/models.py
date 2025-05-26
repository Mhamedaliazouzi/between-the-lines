from django.db import models
from django.utils.text import slugify
import re

class DoctorVideo(models.Model):
    # Change from FileField to URLField for Google Drive links
    file_url = models.URLField(max_length=500, help_text="Google Drive video URL")
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)
    description = models.CharField(max_length=255, blank=True)

    def get_embeddable_url(self):
        """
        Convert Google Drive share URL to embeddable URL
        Example: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
        To: https://drive.google.com/file/d/FILE_ID/preview
        """
        if 'drive.google.com' in self.file_url:
            # Extract file ID from various Google Drive URL formats
            file_id_match = re.search(r'/file/d/([a-zA-Z0-9-_]+)', self.file_url)
            if file_id_match:
                file_id = file_id_match.group(1)
                return f"https://drive.google.com/file/d/{file_id}/preview"
        return self.file_url

    def get_direct_download_url(self):
        """
        Convert Google Drive URL to direct download URL for video tag
        """
        if 'drive.google.com' in self.file_url:
            file_id_match = re.search(r'/file/d/([a-zA-Z0-9-_]+)', self.file_url)
            if file_id_match:
                file_id = file_id_match.group(1)
                return f"https://drive.google.com/uc?export=download&id={file_id}"
        return self.file_url

    def __str__(self):
        return self.description or f"Video: {self.file_url[:50]}..."

class Doctor(models.Model):
    SPECIALTY_CHOICES = [
        ('pedopsychiatre', 'Child Psychiatrist'),
        ('psy', 'Psychologist'),
        ('coach', 'Life Coach'),
    ]

    TOPIC_CHOICES = [
        ('adhd', 'ADHD'),
        ('social_anxiety', 'Social Anxiety'),
        ('autism', 'Autism'),
    ]

    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100, default='Unknown')
    specialty = models.CharField(max_length=20, choices=SPECIALTY_CHOICES, default='psy')
    topic = models.CharField(max_length=20, choices=TOPIC_CHOICES, default='adhd')
    image = models.ImageField(upload_to='doctors/')
    # Change from FileField to URLField for Google Drive links
    introduction_video_url = models.URLField(max_length=500, blank=True, null=True, help_text="Google Drive video URL")
    question_videos = models.ManyToManyField(DoctorVideo, blank=True)
    slug = models.SlugField(unique=True, blank=True)

    def get_intro_video_embeddable_url(self):
        """
        Convert Google Drive share URL to embeddable URL for introduction video
        """
        if self.introduction_video_url and 'drive.google.com' in self.introduction_video_url:
            file_id_match = re.search(r'/file/d/([a-zA-Z0-9-_]+)', self.introduction_video_url)
            if file_id_match:
                file_id = file_id_match.group(1)
                return f"https://drive.google.com/file/d/{file_id}/preview"
        return self.introduction_video_url

    def get_intro_video_direct_url(self):
        """
        Convert Google Drive URL to direct download URL for video tag
        """
        if self.introduction_video_url and 'drive.google.com' in self.introduction_video_url:
            file_id_match = re.search(r'/file/d/([a-zA-Z0-9-_]+)', self.introduction_video_url)
            if file_id_match:
                file_id = file_id_match.group(1)
                return f"https://drive.google.com/uc?export=download&id={file_id}"
        return self.introduction_video_url

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name