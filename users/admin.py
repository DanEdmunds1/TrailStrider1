from django.contrib import admin, auth

User = auth.get_user_model()
# Register your models here.
admin.site.register(User)