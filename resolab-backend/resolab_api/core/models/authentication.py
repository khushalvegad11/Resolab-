from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.utils.timezone import now

phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',  message="Invalid phone number entered.")

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    staff = models.BooleanField(default=False, blank=True)
    name = models.CharField(max_length=200, default='Guest User')
    email = models.EmailField(default = "na",blank=True,null=True)
    phone_number = models.CharField(unique=True, validators=[phone_regex], max_length=17)
    addedparam = models.CharField(max_length=400)
    profile_pic_url = models.TextField(blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    date_of_birth = models.CharField(max_length=10)
    registered_region = models.CharField(max_length=120)
    is_verified = models.BooleanField(default=False)
    card_made = models.BooleanField(default=False)
    is_subscribed = models.BooleanField(default=False)
    plan_end_date = models.DateField(default=now, blank=True)
    plan_id = models.CharField(max_length=100, blank=True)
    sub_id = models.CharField(max_length=100, blank=True)
    industry = models.CharField(max_length=100, default="NA", null = True,blank = True)
    is_seeker = models.BooleanField(default=False,null=True,blank = True)
    is_provider = models.BooleanField(default=False,null=True,blank = True)

    def __str__(self):
        return '%s' % self.addedparam

# Payments
class SubscriptionPaymentHistory(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    sub_id = models.CharField(max_length=100)
    plan_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s for sub ID %s' % (self.user.phone_number, self.sub_id)
