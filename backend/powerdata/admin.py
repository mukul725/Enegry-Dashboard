from django.contrib import admin
from .models import PowerData

# Register your models here.


class CustomPowerDataAdmin(admin.ModelAdmin):
    model = PowerData
    list_display = ('user', 'date', 'country',
                    'state', 'city', 'distribution_loss', "consumption_mw", "generation_mw")
    list_filter = ('country', 'city', 'state')
    fieldsets = (('Role-access', {'fields': ('user',  'country',
                                             'state', 'city', 'distribution_loss', "consumption_mw", "generation_mw")}),)
    add_fieldsets = (
        ('Role-access', {'fields': ('user',  'country',
                                    'state', 'city', 'distribution_loss', "consumption_mw", "generation_mw")}),)


admin.site.register(PowerData, CustomPowerDataAdmin)
