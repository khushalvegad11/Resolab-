from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError

# Create your models here.

phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',  message="Invalid phone number entered.")

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, default='Guest User')
    email = models.EmailField()
    phone_number = models.CharField(unique=True, validators=[phone_regex], max_length=17)
    email = models.EmailField(blank=True)
    addedparam = models.CharField(max_length=400)
    profile_pic_url = models.TextField(blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    date_of_birth = models.CharField(max_length=10)
    registered_region = models.CharField(max_length=120)
    card_made = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_subscribed = models.BooleanField(default=False)
    def __str__(self):
            return '%s' % (self.name)

class Industry(models.Model):
    industry_name = models.CharField(unique=True, max_length=120)

    def __str__(self):
        return '%s' % self.industry_name

class ResourceType(models.Model):
    industry = models.ForeignKey(Industry, on_delete=models.CASCADE)
    type_name = models.CharField(max_length=120)

    def __str__(self):
        return '%s' % self.type_name

class ResourceCategory(models.Model):
    resource_type = models.ForeignKey(ResourceType, on_delete=models.CASCADE)
    category_name = models.CharField(max_length=120)

    def __str__(self):
        return '%s' % self.category_name

class Job(models.Model):
    category = models.ForeignKey(ResourceCategory, on_delete=models.CASCADE)
    job_name = models.CharField(max_length=120, unique=True)

    def __str__(self):
        return '%s %s' % (self.job_name, self)

class ResourceSeekerCard(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    job = models.CharField(max_length=300,blank="True")
    pia_tp_name = models.CharField(max_length=100)
    legal_status = models.CharField(max_length=100)
    is_authorized = models.BooleanField(default=False)
    designation = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=150, blank=True)
    location = models.CharField(max_length=200)
    reporting_manager_name = models.CharField(max_length=120, blank=True)
    manager_designation = models.CharField(max_length=100, blank=True)
    manager_contact_number = models.CharField(max_length=17, validators=[phone_regex], blank=True)
    manager_email_id = models.EmailField(max_length=200, blank=True)
    # Resource Criteria
    qualification = models.CharField(max_length=100)
    pref_qualification = models.CharField(max_length=100)
    additional_req = models.CharField(max_length=150)
    is_exp_required = models.BooleanField(default=False)
    experience_details = models.CharField(max_length=200)
    min_salary = models.PositiveIntegerField()
    max_salary = models.PositiveIntegerField()
    joining_requirement = models.CharField(max_length=100)
    job_location = models.CharField(max_length=200)
    # Verification status
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return '%s for %s SeekerCardID: %s' % (self.user.user.username, self.job, self.id)

class ResourceProviderCard(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    job = models.CharField(max_length=300,blank="True")
    aadhar_no = models.CharField(max_length=12, blank=True)
    current_work_state = models.CharField(max_length=100)
    current_work_district = models.CharField(max_length=200)
    educational_qualification = models.CharField(max_length=100)
    # Work Experience
    exp_skill_industry = models.PositiveSmallIntegerField()
    project_name = models.CharField(max_length=200)
    exp_non_skill = models.PositiveSmallIntegerField()
    # Previous organizations
    organization_1_name = models.CharField(max_length=100, blank=True)
    designation_1 = models.CharField(max_length=100, blank=True)
    total_tenure_1 = models.PositiveSmallIntegerField(blank=True)
    organization_2_name = models.CharField(max_length=100, blank=True)
    designation_2 = models.CharField(max_length=100, blank=True)
    total_tenure_2 = models.PositiveSmallIntegerField(blank=True)
    organization_3_name = models.CharField(max_length=100, blank=True)
    designation_3 = models.CharField(max_length=100, blank=True)
    total_tenure_3 = models.PositiveSmallIntegerField(blank=True)
    # Other
    achievement = models.TextField(blank=True)
    # Verification status
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return '%s for %s ProviderCardID: %s' % (self.user.user.username, self.job, self.id)
