from django.contrib import admin
from resolab_api.core.models import *
from rest_framework import serializers


class UserProfileAdmin(admin.ModelAdmin):
    search_fields = ['email']

# Register your models here.

admin.site.register(UserProfile)
admin.site.register(Mfquestions)
admin.site.register(SubscriptionPaymentHistory)
admin.site.register(Industry)
admin.site.register(ResourceType)
admin.site.register(ResourceCategory)
admin.site.register(Job)
admin.site.register(ResourceSeekerCardPeople)
admin.site.register(ResourceProviderCardPeople)
admin.site.register(ResourceSeekerCardAdvisoryAlliedServices)
admin.site.register(ResourceProviderCardAdvisoryAlliedServices)
admin.site.register(ResourceSeekerCardInfra)
admin.site.register(ResourceProviderCardInfra)
admin.site.register(ConnectForm)
admin.site.register(PendingVerifications)
