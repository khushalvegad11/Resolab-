from rest_framework.exceptions import ValidationError
from rest_framework import serializers

from resolab_api.core.models import *
from resolab_api.core.serializers.job_roles import *
from resolab_api.core.serializers.authentication import *

class ResourceSeekerCardPeopleSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=UserProfile.objects.all(), slug_field='addedparam')
    #job = serializers.SlugRelatedField(queryset=Job.objects.all(), slug_field='job_name')
    class Meta:
        model = ResourceSeekerCardPeople
        fields = '__all__'

    def validate(self, data):
        # try:
        #     job = Job.objects.get(job_name=data['job'])
        # except Job.DoesNotExist:
        #     raise serializers.ValidationError('No such job role exists. Please choose from the already available job roles')
        try:
            user = UserProfile.objects.get(addedparam=data['user'])
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError('This phone number is not registered.')
        # if not data['is_authorized']:
        #     raise serializers.ValidationError('Authorization is necessary.')
        return data

class UserProfileUpdateSerializer (serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=UserProfile.objects.all(), slug_field='addedparam')
    class Meta:
        model = UserProfile
        fields = '__all__'

    def validate(self, data):
        try:
            user = UserProfile.objects.get(addedparam=data['user'])
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError('This phone number is not registered.')
        if not data['is_authorized']:
            raise serializers.ValidationError('Authorization is necessary.')
        return data

############################

class ResourceSeekerCardPeopleListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    #job = JobListSerializer()
    class Meta:
        model = ResourceSeekerCardPeople
        fields = '__all__'

class ResourceProviderCardPeopleSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=UserProfile.objects.all(), slug_field='addedparam')
    #job = serializers.SlugRelatedField(queryset=Job.objects.all(), slug_field='job_name')
    class Meta:
        model = ResourceProviderCardPeople
        fields = '__all__'

    def validate(self, data):
        # try:
        #     job = Job.objects.get(job_name=data['job'])
        #     # if job.category.category_name == 'Trainer' and data['aadhar_no'] == '':
        #     #     raise ValidationError('Aadhar Number required for Trainers for verification purpoes.')
        # except Job.DoesNotExist:
        #     raise serializers.ValidationError('No such job role exists. Please choose from the already available job roles')
        try:
            user = UserProfile.objects.get(addedparam=data['user'])
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError('This phone number is not registered.')
        return data

class ResourceProviderCardPeopleListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    # job = JobListSerializer()
    class Meta:
        model = ResourceProviderCardPeople
        fields = '__all__'

class ResourceSeekerCardAdvisoryAlliedServicesSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=UserProfile.objects.all(), slug_field='addedparam')
    # job = serializers.SlugRelatedField(queryset=Job.objects.all(), slug_field='job_name')
    class Meta:
        model = ResourceSeekerCardAdvisoryAlliedServices
        fields = '__all__'

    def validate(self, data):
        # try:
        #     job = Job.objects.get(job_name=data['job'])
        # except Job.DoesNotExist:
        #     raise serializers.ValidationError('No such job role exists. Please choose from the already available job roles')
        try:
            user = UserProfile.objects.get(addedparam=data['user'])
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError('This phone number is not registered.')
        return data

class ResourceSeekerCardAdvisoryAlliedServicesListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    # job = JobListSerializer()
    class Meta:
        model = ResourceSeekerCardAdvisoryAlliedServices
        fields = '__all__'

class ResourceProviderCardAdvisoryAlliedServicesSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=UserProfile.objects.all(), slug_field='addedparam')
    # job = serializers.SlugRelatedField(queryset=Job.objects.all(), slug_field='job_name')
    class Meta:
        model = ResourceProviderCardAdvisoryAlliedServices
        fields = '__all__'

    def validate(self, data):
        # try:
        #     job = Job.objects.get(job_name=data['job'])
        # except Job.DoesNotExist:
        #     raise serializers.ValidationError('No such service exists. Please choose from the already available services')
        try:
            user = UserProfile.objects.get(addedparam=data['user'])
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError('This phone number is not registered.')
        return data

class ResourceProviderCardAdvisoryAlliedServicesListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    # job = JobListSerializer()
    class Meta:
        model = ResourceProviderCardAdvisoryAlliedServices
        fields = '__all__'

class ResourceSeekerCardInfraSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=UserProfile.objects.all(), slug_field='addedparam')
    # job = serializers.SlugRelatedField(queryset=Job.objects.all(), slug_field='job_name')
    class Meta:
        model = ResourceSeekerCardInfra
        fields = '__all__'

    def validate(self, data):
        # try:
        #     job = Job.objects.get(job_name=data['job'])
        # except Job.DoesNotExist:
        #     raise serializers.ValidationError('No such service exists. Please choose from the already available services')
        try:
            user = UserProfile.objects.get(addedparam=data['user'])
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError('This phone number is not registered.')
        return data







class ResourceSeekerCardInfraListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    # job = JobListSerializer()
    class Meta:
        model = ResourceSeekerCardInfra
        fields = '__all__'

class ResourceProviderCardInfraSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=UserProfile.objects.all(), slug_field='addedparam')
    # job = serializers.SlugRelatedField(queryset=Job.objects.all(), slug_field='job_name')
    class Meta:
        model = ResourceProviderCardInfra
        fields = '__all__'

    def validate(self, data):
        # try:
        #     job = Job.objects.get(job_name=data['job'])
        # except Job.DoesNotExist:
        #     raise serializers.ValidationError('No such service exists. Please choose from the already available services')
        try:
            user = UserProfile.objects.get(addedparam=data['user'])
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError('This phone number is not registered.')
        return data

        
class ConnectFormSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(queryset=UserProfile.objects.all(), slug_field='addedparam')
    class Meta:
        model = ConnectForm
        fields = '__all__'

    def validate(self, data):
        try:
            sender = UserProfile.objects.get(addedparam=data['sender'])
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError('This user is not registered.')
        return data

class PendingVerificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingVerifications
        fields = '__all__'

    def validate(self, data):
       return data

class ResourceProviderCardInfraListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    # job = JobListSerializer()
    class Meta:
        model = ResourceProviderCardInfra
        fields = '__all__'
