from firebase_admin import auth
from firebase_admin._auth_utils import InvalidIdTokenError
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY

from resolab_api.core.models import ResourceSeekerCardPeople, ResourceProviderCardPeople
from resolab_api.verification.models import *

class StaffRegisterSerializer(serializers.Serializer):
    uid = serializers.CharField(max_length=64)
    name = serializers.CharField(max_length=200)
    phone_number = serializers.CharField(validators=[phone_regex], max_length=17)
    email = serializers.EmailField(allow_blank=True)
    profile_pic_url = serializers.CharField(allow_blank=True)
    date_of_birth = serializers.CharField(max_length=10)

    def validate(self, data):
        if User.objects.filter(username=data['uid']).exists():
            raise ValidationError('This number is already registered!', HTTP_406_NOT_ACCEPTABLE)
        return data

    def save(self):
        validated_data = self.validated_data
        user = User(username=validated_data['uid'])
        user.save()
        account, created = StaffProfile.objects.get_or_create(user=user)
        account.phone_number = validated_data['phone_number']
        account.name = validated_data['name']
        account.email = validated_data['email']
        account.profile_pic_url = validated_data.get('profile_pic_url', '')
        account.date_of_birth = validated_data['date_of_birth']
        account.save()
        return account

class StaffLoginSerializer(serializers.Serializer):
    id_token = serializers.CharField(max_length=2400)

    def validate(self, data):
        try:
            jwt = auth.verify_id_token(data['id_token'])
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
        user = User.objects.get(name=jwt['uid'])
        token, created = Token.objects.get_or_create(user=user)
        return token

class VerifySeekerCardSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def validate(self, data):
        seeker_id = data['id']
        try:
            ResourceSeekerCardPeople.objects.get(pk=seeker_id)
        except ResourceSeekerCardPeople.DoesNotExist:
            raise ValidationError('Seeker card with the given id does not exist.')
        return data

    def verify_card(self):
        seeker_id = self.validated_data.get('id')
        card = ResourceSeekerCardPeople.objects.get(pk=seeker_id)
        card.is_verified = True
        card.save()

class VerifyProviderCardSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def validate(self, data):
        provider_id = data['id']
        try:
            ResourceProviderCardPeople.objects.get(pk=provider_id)
        except ResourceProviderCardPeople.DoesNotExist:
            raise ValidationError('Provider card with the given id does not exist.')

    def verify_card(self):
        provider_id = self.validated_data.get('id')
        card = ResourceProviderCardPeople.objects.get(pk=provider_id)
        card.is_verified = True
        card.save()


class RetrieveSubscriptionPlanSerializer(serializers.ModelSerializer):
    total_amount = serializers.SerializerMethodField()

    class Meta:
        model = SubscriptionPlan
        fields = ('__all__')
        extra_fields = ['total_amount']

    def get_total_amount(self, obj):
        if obj.tax:
            total_amount = obj.plan_amount + ((obj.plan_amount*18.0)/100)
        else:
            total_amount = obj.plan_amount

        return total_amount

class CheckoutSubscriptionDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ('__all__')


class SubscriptionOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionOrder
        fields = ('__all__')


class SubscriptionPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPayment
        fields = ('__all__')
        
class UserSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubscription
        fields = ('__all__')
