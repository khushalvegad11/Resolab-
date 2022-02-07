from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from resolab_api.core.models import UserProfile
# Create your models here.

phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',  message="Invalid phone number entered.")

class StaffProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    phone_number = models.CharField(unique=True, validators=[phone_regex], max_length=17)
    email = models.EmailField()
    profile_pic_url = models.TextField(blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    date_of_birth = models.CharField(max_length=10)

    def __str__(self):
        return '%s' % self.name

class SubscriptionPlan(models.Model):
    DURATION = (
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('semiannual', 'Semi-Annual'),
        ('annual', 'Annual'),
    )
    CATEGORY = (
        ('individual', 'Individual'),
        ('institutional', 'Institutional')
    )
    plan_name = models.CharField(max_length=100 , blank=True , null=True)
    plan_code = models.CharField(max_length=100 , unique=True , blank=True , null=True)
    plan_duration = models.CharField(choices=DURATION , max_length=20, null=True , blank=True)
    plan_category = models.CharField(choices=CATEGORY , max_length=20 , null=True , blank=True)
    plan_amount = models.FloatField(null=True , blank=True)
    tax = models.FloatField(null=True , blank=True)
    currency = models.CharField(max_length=100 , blank=True , null=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=False , auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True , auto_now_add=False)
    
    def __str__(self):
        return self.plan_name

class UserSubscription(models.Model):
    plan_id = models.ForeignKey(SubscriptionPlan , related_name="subscription_plan_id", blank=True , null=True , on_delete=models.CASCADE)
    user_id = models.ForeignKey(UserProfile , related_name="user_subscription_id", blank=True , null=True , on_delete=models.CASCADE)    
    is_expired = models.BooleanField(default=False ,blank=True , null=True)
    start_date = models.DateTimeField(blank=True , null=True)
    end_date = models.DateTimeField(blank=True , null=True)
    created_at = models.DateTimeField(auto_now=False , auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True , auto_now_add=False)
    is_newly_registered = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.plan_id)


class SubscriptionOrder(models.Model):
    STATUS = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled')
    )
    AMOUNT_UNIT = (
        ('paise', 'Paise'),
        ('rupee', 'Rupee')
    )
    order_id = models.CharField(max_length=100 , blank=True , null=True, unique=True)
    plan_id = models.ForeignKey(SubscriptionPlan, related_name='subscription_plan_order_plan_id', 
        blank=True, null=True, on_delete=models.CASCADE)
    amount = models.FloatField(null=True , blank=True)
    currency = models.CharField(max_length=100 , blank=True , null=True)
    amount_unit = models.CharField(choices=AMOUNT_UNIT, max_length=100 , blank=True , null=True)
    status = models.CharField(choices=STATUS, max_length=20, null=True, blank=True)
    order_by = models.ForeignKey(UserProfile , related_name="subscription_order_order_by", 
        blank=True , null=True , on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=False , blank=True)
    updated_at = models.DateTimeField(blank=True , auto_now_add=False)
    updated_by = models.ForeignKey(UserProfile , related_name="subscription_order_updated_by", 
        blank=True , null=True , on_delete=models.CASCADE)

    def __str__(self):
        return str(self.order_id)


class SubscriptionPayment(models.Model):
    AMOUNT_UNIT = (
        ('paise', 'Paise'),
        ('rupee', 'Rupee')
    )
    
    payment_id = models.CharField(max_length=100 , blank=True , null=True, unique=True)
    entity = models.CharField(max_length=100 , blank=True , null=True)
    amount = models.FloatField(null=True , blank=True)
    currency = models.CharField(max_length=100 , blank=True , null=True)
    status = models.CharField(max_length=20, null=True, blank=True)
    order_id = models.CharField(max_length=100 , blank=True , null=True)
    invoice_id = models.CharField(max_length=100 , blank=True , null=True)
    international = models.BooleanField(default=False)
    method = models.CharField(max_length=100 , blank=True , null=True)
    amount_refunded = models.FloatField(null=True , blank=True)
    refund_status = models.CharField(max_length=100 , blank=True , null=True)
    captured = models.BooleanField(default=False)
    description = models.CharField(max_length=100 , blank=True , null=True)
    card_id = models.CharField(max_length=100 , blank=True , null=True)
    card_entity = models.CharField(max_length=100 , blank=True , null=True)
    card_name = models.CharField(max_length=100 , blank=True , null=True)
    card_last4 = models.CharField(max_length=100 , blank=True , null=True)
    card_network = models.CharField(max_length=100 , blank=True , null=True)
    card_type = models.CharField(max_length=100 , blank=True , null=True)
    card_issuer = models.CharField(max_length=100 , blank=True , null=True)
    card_international = models.BooleanField(default=False)
    card_emi = models.BooleanField(default=False)
    card_sub_type = models.CharField(max_length=100 , blank=True , null=True)
    bank = models.CharField(max_length=100 , blank=True , null=True)
    wallet = models.CharField(max_length=100 , blank=True , null=True)
    vpa = models.CharField(max_length=100 , blank=True , null=True)
    email = models.CharField(max_length=100 , blank=True , null=True)
    contact = models.CharField(max_length=100 , blank=True , null=True)
    notes = models.CharField(max_length=100 , blank=True , null=True)
    fee = models.FloatField(null=True , blank=True)
    tax = models.FloatField(null=True , blank=True)
    error_code = models.CharField(max_length=100 , blank=True , null=True)
    error_description = models.CharField(max_length=500 , blank=True , null=True)
    error_source = models.CharField(max_length=500 , blank=True , null=True)
    error_step = models.CharField(max_length=500 , blank=True , null=True)
    error_reason = models.CharField(max_length=500 , blank=True , null=True)
    created_at = models.DateTimeField(auto_now=False , blank=True)
    amount_unit = models.CharField(choices=AMOUNT_UNIT, max_length=100 , blank=True , null=True)