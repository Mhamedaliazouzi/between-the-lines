# Generated by Django 5.2.1 on 2025-05-22 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BTL', '0003_doctorvideo_alter_doctor_introduction_video_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctorvideo',
            name='thumbnail',
            field=models.ImageField(blank=True, null=True, upload_to='videos/thumbnails/'),
        ),
    ]
