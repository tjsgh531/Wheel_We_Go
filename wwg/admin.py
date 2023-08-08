from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Users)
admin.site.register(Regions)
admin.site.register(Records)
admin.site.register(Markings)