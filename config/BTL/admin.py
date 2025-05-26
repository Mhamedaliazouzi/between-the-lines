from django.contrib import admin
from .models import Doctor, DoctorVideo

@admin.register(DoctorVideo)
class DoctorVideoAdmin(admin.ModelAdmin):
    list_display = ('description', 'file_url', 'thumbnail')
    list_filter = ('description',)
    search_fields = ('description', 'file_url')
    
    fieldsets = (
        ('Video Information', {
            'fields': ('description', 'file_url', 'thumbnail'),
            'description': 'Enter the Google Drive sharing URL for the video. Make sure the video is set to "Anyone with the link can view".'
        }),
    )
    
    readonly_fields = ()
    
    def get_readonly_fields(self, request, obj=None):
        # You can add any read-only fields here if needed
        return self.readonly_fields

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialty', 'topic', 'location', 'slug')
    list_filter = ('specialty', 'topic', 'location')
    search_fields = ('name', 'location')
    prepopulated_fields = {'slug': ('name',)}
    filter_horizontal = ('question_videos',)
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'location', 'specialty', 'topic', 'image', 'slug')
        }),
        ('Videos', {
            'fields': ('introduction_video_url', 'question_videos'),
            'description': 'For Google Drive videos, use sharing URLs. Make sure videos are set to "Anyone with the link can view".'
        }),
    )
    
    def save_model(self, request, obj, form, change):
        # Auto-generate slug if not provided
        if not obj.slug:
            from django.utils.text import slugify
            obj.slug = slugify(obj.name)
        super().save_model(request, obj, form, change)