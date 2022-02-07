from rest_framework import serializers

from resolab_api.core.models import *

class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = '__all__'

class IndustryListSerializer(serializers.ModelSerializer):
    types = serializers.SlugRelatedField(many=True, read_only=True, slug_field='type_name')
    class Meta:
        model = Industry
        fields = ['id', 'industry_name', 'types']

class ResourceTypeSerializer(serializers.ModelSerializer):
    industry = serializers.SlugRelatedField(queryset=Industry.objects.all(), slug_field='industry_name')
    class Meta:
        model = ResourceType
        fields = '__all__'

class ResourceTypeListSerializer(serializers.ModelSerializer):
    industry = IndustrySerializer()
    categories = serializers.SlugRelatedField(many=True, read_only=True, slug_field='category_name')
    class Meta:
        model = ResourceType
        fields = ['id', 'type_name', 'industry', 'categories']

class ResourceCategorySerializer(serializers.ModelSerializer):
    resource_type = serializers.SlugRelatedField(queryset=ResourceType.objects.all(), slug_field='type_name')
    class Meta:
        model = ResourceCategory
        fields = '__all__'

class ResourceCategoryListSerializer(serializers.ModelSerializer):
    resource_type = ResourceTypeListSerializer()
    jobs = serializers.SlugRelatedField(many=True, read_only=True, slug_field='job_name')
    class Meta:
        model = ResourceCategory
        fields = ['id', 'category_name', 'resource_type', 'jobs']

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
