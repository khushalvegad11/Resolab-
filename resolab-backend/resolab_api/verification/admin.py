from django.contrib import admin

from resolab_api.verification.models import *

class SubPlanAdmin(admin.ModelAdmin):
    list_display = ['plan_name' , 'plan_amount' , 'plan_category']
    
class UserSubscriptionAdmin(admin.ModelAdmin):
    list_display = ["plan_id" , "user_id" , "start_date" , "end_date"]
    list_filter = ["plan_id"]
    
    
# Register your models here.
admin.site.register(UserSubscription , UserSubscriptionAdmin)
admin.site.register(SubscriptionPlan , SubPlanAdmin)
admin.site.register(SubscriptionOrder)
admin.site.register(SubscriptionPayment)
admin.site.register(StaffProfile)
