from django.core.validators import RegexValidator
from firebase_admin import auth
from firebase_admin._auth_utils import InvalidIdTokenError
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_406_NOT_ACCEPTABLE
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.db import IntegrityError

from resolab_api.core.models import *

import logging

# Get an instance of a logger
log = logging.getLogger(__name__)

phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',  message="Invalid phone number entered.")

class RegisterSerializer(serializers.Serializer):
    uid = serializers.CharField(max_length=64)
    name = serializers.CharField(max_length=200)
    email = serializers.EmailField(allow_blank=True)
    profile_pic_url = serializers.CharField(allow_blank=True)
    registered_region = serializers.CharField(max_length=120)
    phone_number = serializers.CharField(validators=[phone_regex], max_length=17)
    date_of_birth = serializers.CharField(max_length=10)
    addedparam = serializers.CharField(max_length=400)
    is_verified = serializers.BooleanField(default=False)
    card_made = models.BooleanField(default=False)
    is_subscribed = serializers.BooleanField(default=False)
    industry = serializers.CharField(max_length=100)
    is_seeker = serializers.BooleanField(default=False)
    is_provider = serializers.BooleanField(default=False)

    def validate(self, data):
        if User.objects.filter(username=data['uid']).exists():
            print(User.objects.get(username=data['uid']))
            raise ValidationError('This phone number is already registered!', HTTP_406_NOT_ACCEPTABLE)
        if len(data['phone_number']) != 13:
            raise ValidationError('Phone Number not valid!', HTTP_406_NOT_ACCEPTABLE)
        if UserProfile.objects.filter(phone_number=data['phone_number']).exists():
            print(User.objects.get(phone_number=data['phone_number']))
            raise ValidationError('This phone number is already registered!', HTTP_406_NOT_ACCEPTABLE)
        return data

    def save(self):
        validated_data = self.validated_data
        user = User(username=validated_data['uid'])
        user.save()
        account, created = UserProfile.objects.get_or_create(user=user)
        account.phone_number = validated_data['phone_number']
        account.name = validated_data['name']
        account.email = validated_data['email']
        account.profile_pic_url = validated_data.get('profile_pic_url', '')
        account.registered_region = validated_data['registered_region']
        account.date_of_birth = validated_data['date_of_birth']
        account.addedparam = validated_data['addedparam']
       # account.card_made = validated_data['card_made']
        account.industry = validated_data['industry']
        account.is_seeker = validated_data['is_seeker']
        account.is_provider = validated_data['is_provider']
        account.save()
        return account

class LoginSerializer(serializers.Serializer):
    id_token = serializers.CharField(max_length=2400)
    def validate(self, data):
        try:
            jwt = auth.verify_id_token(data['id_token'])
            log.info(User.objects)
            try:
                user = User.objects.get(username=jwt['uid'])
            except User.DoesNotExist:
                raise ValidationError('This number is not registered. First register to login!', HTTP_406_NOT_ACCEPTABLE)
        except (ValueError, InvalidIdTokenError):
            raise ValidationError('Invalid Firebase ID Token', HTTP_422_UNPROCESSABLE_ENTITY)
        return data

    def get_token_and_user(self):
        id_token = self.data['id_token']
        jwt = auth.verify_id_token(id_token)
        user = User.objects.get(username=jwt['uid'])
        token, created = Token.objects.get_or_create(user=user)
        user_profile = user.userprofile
        return str(token), user_profile

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    class Meta:
        model = UserProfile
        fields = '__all__'

'''
class UpdateUserProfileSerializer(serializers.Serializer):

    industry = serializers.CharField(max_length=100)
    is_seeker = serializers.BooleanField(default=False)
    is_provider = serializers.BooleanField(default=False)
    def requestUpdate(self):
        try:
            user = self.context['user']
            print(user)
            user_profile = UserProfile.objects.get(user = user)
            print(user_profile.user)
            user_profile.industry = self.data['industry']
            user_profile.is_seeker= self.data['is_seeker']
            user_profile.is_provider = self.data['is_provider']
            user_profile.save()
            return user_profile
        except:
            raise ValidationError('Something went wrong. Try again later.', HTTP_406_NOT_ACCEPTABLE)
'''


class UpdateUserProfileSerializer(serializers.Serializer):

    industry = serializers.CharField(max_length=100)
    is_seeker = serializers.BooleanField(default=False)
    is_provider = serializers.BooleanField(default=False)
    
    def requestUpdate(self):
        try:
            user = None
            request = self.context.get("request")
            if request and hasattr(request, "user"):
                print("it does")
                user = request.user
            print(user)
            user_profile = UserProfile.objects.get(user = user)
            print(user_profile.user)
            user_profile.industry = self.data['industry']
            user_profile.is_seeker= self.data['is_seeker']
            user_profile.is_provider = self.data['is_provider']
            user_profile.save()
            return user_profile

        except:
            raise ValidationError("Something went wrong. Try later or contact our team if error persists.", HTTP_406_NOT_ACCEPTABLE)





# Payments
class SubscriptionPaymentHistorySerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=UserProfile.objects.all(), slug_field='addedparam')

    class Meta:
        model = SubscriptionPaymentHistory
        fields = '__all__'

class SubscriptionPaymentHistoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPaymentHistory
        exclude = ['user']
