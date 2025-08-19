from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Register your models here.


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'role', 'position', 'country',
                    'state', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    fieldsets = UserAdmin.fieldsets + \
        (('Role-access', {'fields': ('role', 'country', 'state', 'position')}),)
    add_fieldsets = UserAdmin.add_fieldsets + \
        (('Role-access', {'fields': ('role', 'country', 'state', 'position')}),)


admin.site.register(CustomUser, CustomUserAdmin)
