from django.core.validators import RegexValidator
from firebase_admin import auth
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_406_NOT_ACCEPTABLE

from resolab_api.core.models import *

phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',  message="Invalid phone number entered.")

class ResponseSerializer(serializers.Serializer):
    response = serializers.CharField(max_length=500)

class RegisterSerializer(serializers.Serializer):
    uid = serializers.CharField(max_length=64)
    name = serializers.CharField(max_length=220)
    email = serializers.EmailField(allow_blank=True)
    profile_pic_url = serializers.CharField(allow_blank=True)
    registered_region = serializers.CharField(max_length=120)
    phone_number = serializers.CharField(validators=[phone_regex], max_length=17)
    date_of_birth = serializers.CharField(max_length=10)
    addedparam = serializers.CharField(max_length=400)
    is_verified = serializers.BooleanField(default=False)
    card_made = models.BooleanField(default=False)
    is_subscribed = serializers.BooleanField(default=False)

    def save(self):
        validated_data = self.validated_data
        user = User(username=validated_data['uid'])
        try:
            user.validate_unique()
        except ValidationError:
            raise serializers.ValidationError('This number is already registered!')
        user.save()
        account, created = UserProfile.objects.get_or_create(user=user)
        account.phone_number = validated_data['phone_number']
        account.name = validated_data['name']
        account.email = validated_data['email']
        account.profile_pic_url = validated_data.get('profile_pic_url', '')
        account.registered_region = validated_data['registered_region']
        account.card_made = validated_data['card_made']
        account.addedparam = validated_data['addedparam']
        account.date_of_birth = validated_data['date_of_birth']
        account.save()
        return account

class LoginSerializer(serializers.Serializer):
    id_token = serializers.CharField(max_length=2400)

    def get_token_and_user(self):
        id_token = self.data['id_token']
        try:
            jwt = auth.verify_id_token(id_token)
            user = User.objects.get(username=jwt['uid'])
            token, created = Token.objects.get_or_create(user=user)
            return token
        except ValueError:
            raise ValidationError('Invalid Firebase ID Token', HTTP_422_UNPROCESSABLE_ENTITY)

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    class Meta:
        model = UserProfile
        fields = '__all__'

class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = '__all__'

class ResourceTypeSerializer(serializers.ModelSerializer):
    industry = serializers.SlugRelatedField(queryset=Industry.objects.all(), slug_field='industry_name')
    class Meta:
        model = ResourceType
        fields = '__all__'

class ResourceTypeListSerializer(serializers.ModelSerializer):
    industry = IndustrySerializer()
    class Meta:
        model = ResourceType
        fields = '__all__'

class ResourceCategorySerializer(serializers.ModelSerializer):
    resource_type = serializers.SlugRelatedField(queryset=ResourceType.objects.all(), slug_field='type_name')
    class Meta:
        model = ResourceCategory
        fields = '__all__'

class ResourceCategoryListSerializer(serializers.ModelSerializer):
    resource_type = ResourceTypeListSerializer()
    class Meta:
        model = ResourceCategory
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(queryset=ResourceCategory.objects.all(), slug_field='category_name')
    class Meta:
        model = Job
        fields = '__all__'

class JobListSerializer(serializers.ModelSerializer):
    category = ResourceCategoryListSerializer()
    class Meta:
        model = Job
        fields = '__all__'

class ResourceSeekerCardSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=UserProfile.objects.all(), slug_field='addedparam')
    job = serializers.SlugRelatedField(queryset=Job.objects.all(), slug_field='job_name')
    class Meta:
        model = ResourceSeekerCard
        fields = '__all__'

    def validate(self, data):
        try:
            job = Job.objects.get(job_name=data['job'])
        except Job.DoesNotExist:
            raise serializers.ValidationError('No such job role exists. Please choose from the already available job roles')
        try:
            user = UserProfile.objects.get(addedparam=data['user'])
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError('This phone number is not registered.')
        return data

class ResourceSeekerCardListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    job = JobListSerializer()
    class Meta:
        model = ResourceSeekerCard
        fields = '__all__'

class ResourceProviderCardSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=UserProfile.objects.all(), slug_field='addedparam')
    job = serializers.SlugRelatedField(queryset=Job.objects.all(), slug_field='job_name')
    class Meta:
        model = ResourceProviderCard
        fields = '__all__'

    def validate(self, data):
        try:
            job = Job.objects.get(job_name=data['job'])
            if job.category.category_name == 'Trainer' and data['aadhar_no'] == '':
                raise ValidationError('Aadhar Number required for Trainers for verification purpoes.')
        except Job.DoesNotExist:
            raise serializers.ValidationError('No such job role exists. Please choose from the already available job roles')
        try:
            user = UserProfile.objects.get(addedparam=data['user'])
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError('This phone number is not registered.')
        return data

class ResourceProviderCardListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    job = JobListSerializer()
    class Meta:
        model = ResourceProviderCard
        fields = '__all__'
