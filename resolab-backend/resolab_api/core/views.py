import boto3
from botocore.exceptions import ClientError
from decouple import config
from django.http import Http404
import razorpay
from django.core import serializers as sr
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_400_BAD_REQUEST, HTTP_422_UNPROCESSABLE_ENTITY
from rest_framework.views import APIView
from rest_framework import generics
from resolab_api.core.models import *
from resolab_api.core.serializers import *
import coreapi
from rest_framework.schemas import AutoSchema, ManualSchema
import coreschema
import json
from django.utils.functional import SimpleLazyObject,LazyObject
from django.http import HttpResponse
from resolab_api.verification.models import *
from datetime import datetime , timedelta
from .helpers.customPagination import CustomPagination

# Create your views here.

TEST_MODE = False

BUCKET_NAME = config('S3_BUCKET')
client = razorpay.Client(auth=(config('RAZORPAY_API_KEY'), config('RAZORPAY_API_SECRET')))

#client = razorpay.Client(auth=(config('RAZORPAY_TEST_API_KEY'), config('RAZORPAY_TEST_API_SECRET')))

client.set_app_details({"title": "Resolab API", "version": "0.0.0"})

# Authentication and User
class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        self.serializer = self.get_serializer(data=request.data)
        self.serializer.is_valid(raise_exception=True)
        
        self.serializer.save()
        user = UserProfile.objects.get(email=self.serializer.data.get('email'))
        user_subscription_free_trial = UserSubscription.objects.create(
            user_id = user,
            start_date = datetime.now(),
            end_date = datetime.now() + timedelta(days=30),
            is_newly_registered=True
        )
        
        return Response({
            'response': 'User Registered!'
        }, HTTP_200_OK)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        try:
            self.serializer = self.get_serializer(data=request.data)
            self.serializer.is_valid(raise_exception=True)
            token, user_profile = self.serializer.get_token_and_user()
            return Response({
                'token': token,
                'user_profile': UserProfileSerializer(user_profile).data
            }, HTTP_200_OK)
        except Exception as error:
            return Response({'error': str(error)}, 401)

class GetPresignedUrlS3POST(APIView):
    def get(self, request):
        s3_client = boto3.client('s3')
        try:
            response = s3_client.generate_presigned_post(BUCKET_NAME, request.query_params['file_name'])
            return Response({
                'url': response['url'],
                'fields': response['fields']
            }, HTTP_200_OK)
        except ClientError:
            return Response({
                'response': 'Something is not right. We are working on it.'
            }, HTTP_500_INTERNAL_SERVER_ERROR)

class SetProfilePictureUrl(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        url = request.data['url']
        user_profile = UserProfile(user=request.user)
        user_profile.profile_pic_url = url
        user_profile.save()
        return Response({
            'response': 'Profile picture updated successfully!'
        }, HTTP_200_OK)


class UpdateUserProfileView(generics.GenericAPIView):

    permission_classes=[IsAuthenticated]
    serializer_class = UpdateUserProfileSerializer

    def post(self,request):
        if isinstance(request.user, User):
            user = request.user
        else:
            user = 'anonymous user'
        self.serializer = self.get_serializer(data=request.data)
        self.serializer.is_valid(raise_exception=True)
        user_profile = self.serializer.requestUpdate()

        #return HttpResponse(json.dumps(content), content_type='application/json')
        return Response({
            'updated_profile': UserProfileSerializer(user_profile).data,
        }, HTTP_200_OK)


class GetUserProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
'''
    def get(self,request):
        permission_classes = [IsAuthenticated]
        user_profile = UserProfile.objects.get(user = request.user)
        print(user_profile)
        serialized_User_profile = sr.serialize('json', [ user_profile, ])  #django.core.serializers has been imported as sr
        print(serialized_User_profile)
        y = json.dumps(serialized_User_profile)
        print("y:")
        print(y)
        return Response({
            'user_profile': serialized_User_profile
        }, HTTP_200_OK)
        '''
    #serializer_class = UserProfileSerializer
    #queryset = UserProfile.objects.all()

# Payments and subscriptions
class GetSubscriptionStatus(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user = request.user)
            return Response({
                'subscription status': user_profile.is_subscribed,
                'active plan':user_profile.plan_id
            }, HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({
                'response': 'No matching user exists!'
            }, HTTP_200_OK)

class SubscribeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user_profile = UserProfile.objects.get(user = request.user)
            try:
                plan_id = request.data['plan_id']
                sub_id = request.data['sub_id']
                user_profile.is_subscribed = True
                user_profile.plan_id = plan_id
                user_profile.sub_id = sub_id
                user_profile.save()
                return Response({
                    'response': 'Subscription successful!'
                }, HTTP_200_OK)
            except KeyError:
                return Response({
                    'response': 'Please select a plan!'
                }, HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({
                'response': 'No matching user exists!'
            }, HTTP_200_OK)

class UnsubscribeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user_profile = UserProfile.objects.get(user = request.user)
            user_profile.plan_id = ''
            user_profile.is_subscribed = False
            user_profile.save()
            return Response({
                'response': 'Un-Subscription successful!'
            }, HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({
                'response': 'No matching user exists!'
            }, HTTP_200_OK)

class GetSubscriptionLink(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user_profile = UserProfile.objects.get(user = request.user)
            notify_info = dict()
            if user_profile.email:
                notify_info['notify_email'] = user_profile.email
            if user_profile.phone_number:
                notify_info['notify_phone'] = user_profile.phone_number
            try:
                plan_id = request.data['plan_id']
                start_at = request.data['start_date']
                data = {
                    'plan_id':plan_id,
                    'total_count': 100,
                    'notify_info': notify_info,
                    'start_at':start_at
                }
                response = client.subscription.create(data=data)
                if 'error' in response:
                    return Response({
                        'response': response.error
                    }, HTTP_400_BAD_REQUEST)

                # Save the order into history of the user.
                order = SubscriptionPaymentHistory(
                    user=request.user.userprofile,
                    sub_id=response['id'],
                    plan_id=response['plan_id'])
                order.save()

                return Response({
                    'response': response
                }, HTTP_200_OK)
            except KeyError:
                return Response({
                    'response': 'Select a plan!'
                }, HTTP_406_NOT_ACCEPTABLE)
        except UserProfile.DoesNotExist:
            return Response({
                'response': 'User Profile not created!'
            }, HTTP_422_UNPROCESSABLE_ENTITY)

class CancelSubscriptionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            sub_id = request.data['sub_id']
            cancel_at_cycle_end = 0
            if 'bool_cancel_at_cycle_end' in request.data:
                cancel_at_cycle_end = request.data['bool_cancel_at_cycle_end']
            try:
                response = client.subscription.cancel(sub_id, data = {'cancel_at_cycle_end': cancel_at_cycle_end})
                if 'error' in response:
                    return Response({
                        'response': response.error
                    }, HTTP_400_BAD_REQUEST)
                return Response({
                    'response': response
                }, HTTP_200_OK)
            except razorpay.errors.BadRequestError:
                return Response({
                    'response': 'Bad Request. Most probably it is the incorrect subscription subscription ID.'
                }, HTTP_400_BAD_REQUEST)
        except KeyError:
            return Response({
                'response': 'Subscription ID is needed!'
            }, HTTP_406_NOT_ACCEPTABLE)

class SubscriptionPaymentHistoryView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    #serializer_class = SubscriptionPaymentHistoryListSerializer
    serializer_class = SubscriptionPaymentHistorySerializer

    def get_queryset(self):
        print(self.request.user)
        return SubscriptionPaymentHistory.objects.filter(user=self.request.user.userprofile)

class SubscriptionPaymentHistoryListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SubscriptionPaymentHistoryListSerializer
    #serializer_class = SubscriptionPaymentHistorySerializer

    def get_queryset(self):
        print(self.request.user)
        return SubscriptionPaymentHistory.objects.filter(user=self.request.user.userprofile)


class GetCurrentStatusSubscriptionPaymentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SubscriptionPaymentHistoryListSerializer

    def get(self, request):
        try:
            sub_id = request.query_params['sub_id']
            user_profile = UserProfile.objects.get(user = request.user)
            #sub_id = user_profile.sub_id
            try:
                response = client.subscription.fetch(sub_id)
                if 'error' in response:
                    return Response({
                        'response': response.error
                    }, HTTP_400_BAD_REQUEST)
                return Response({
                    'response': response
                }, HTTP_200_OK)
            except razorpay.errors.BadRequestError:
                return Response({
                    'response': 'Bad Request. Most probably it is the incorrect subscription subscription ID.'
                }, HTTP_400_BAD_REQUEST)
        except KeyError:
            return Response({
                'response': 'Subscription ID is needed!'
            }, HTTP_406_NOT_ACCEPTABLE)

# Job Roles
class JobListView(generics.ListAPIView):
    serializer_class = JobListSerializer
    queryset = Job.objects.all()

class JobRetrieveView(generics.RetrieveAPIView):
    serializer_class = JobListSerializer
    queryset = Job.objects.all()

class CategoriesListView(generics.ListAPIView):
    serializer_class = ResourceCategoryListSerializer
    queryset = ResourceCategory.objects.all()

class CategoriesRetrieveView(generics.RetrieveAPIView):
    serializer_class = ResourceCategoryListSerializer
    queryset = ResourceCategory.objects.all()

class TypeListView(generics.ListAPIView):
    serializer_class = ResourceTypeListSerializer
    queryset = ResourceType.objects.all()

class TypeRetrieveView(generics.RetrieveAPIView):
    serializer_class = ResourceTypeListSerializer
    queryset = ResourceType.objects.all()

class IndustryListView(generics.ListAPIView):
    serializer_class = IndustryListSerializer
    queryset = Industry.objects.all()

class IndustryRetrieveView(generics.RetrieveAPIView):
    serializer_class = IndustryListSerializer
    queryset = Industry.objects.all()

# People Cards
class ResourceSeekerCardPeopleCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardPeopleSerializer
    queryset = ResourceSeekerCardPeople.objects.all()

class ResourceSeekerCardPeopleListView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardPeopleListSerializer
    queryset = ResourceSeekerCardPeople.objects.all().filter(industry="Skilling").order_by('-id')
    pagination_class = CustomPagination

class ResourceSeekerCardPeopleListViewMf(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardPeopleListSerializer
    queryset = ResourceSeekerCardPeople.objects.all().filter(industry="Microfinance").order_by('-id')
    pagination_class = CustomPagination
    

class ResourceSeekerCardPeopleListViewAll(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardPeopleListSerializer
    queryset = ResourceSeekerCardPeople.objects.all().filter(industry="Skilling").order_by('-id')
    pagination_class = CustomPagination
    

class ResourceSeekerCardPeopleListViewAllMf(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardPeopleListSerializer
    queryset = ResourceSeekerCardPeople.objects.all().filter(industry="Microfinance").order_by('-id')
    pagination_class = CustomPagination
    

class ResourceSeekerCardPeopleListViewAllBoth(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardPeopleListSerializer
    queryset = ResourceSeekerCardPeople.objects.all().order_by('-id')
    pagination_class = CustomPagination
    

class ResourceSeekerCardPeopleRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardPeopleSerializer
    queryset = ResourceSeekerCardPeople.objects.all()

class ResourceProviderCardPeopleCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardPeopleSerializer
    queryset = ResourceProviderCardPeople.objects.all()

class ResourceProviderCardPeopleListView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardPeopleListSerializer
    queryset = ResourceProviderCardPeople.objects.all().filter(industry="Skilling").order_by('-id')
    pagination_class = CustomPagination

class ResourceProviderCardPeopleListViewMf(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardPeopleListSerializer
    queryset = ResourceProviderCardPeople.objects.all().filter(industry="Microfinance").order_by('-id')
    pagination_class = CustomPagination

class ResourceProviderCardPeopleListViewAll(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardPeopleListSerializer
    queryset = ResourceProviderCardPeople.objects.all().filter(industry="Skilling").order_by('-id')
    pagination_class = CustomPagination

class ResourceProviderCardPeopleListViewAllMf(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardPeopleListSerializer
    queryset = ResourceProviderCardPeople.objects.all().filter(industry="Microfinance").order_by('-id')
    pagination_class = CustomPagination

class ResourceProviderCardPeopleListViewAllBoth(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardPeopleListSerializer
    queryset = ResourceProviderCardPeople.objects.all().order_by('-id')
    pagination_class = CustomPagination

class ResourceProviderCardPeopleRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardPeopleSerializer
    queryset = ResourceProviderCardPeople.objects.all()

class ResourceProviderCardPeopleRetrieveView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardPeopleListSerializer
    queryset = ResourceProviderCardPeople.objects.all()


# Advisory and Allied Services
class ResourceSeekerCardAdvisoryAlliedServicesCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardAdvisoryAlliedServicesSerializer
    queryset = ResourceSeekerCardAdvisoryAlliedServices.objects.all()

class ResourceSeekerCardAdvisoryAlliedServicesListView(generics.ListAPIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardAdvisoryAlliedServicesListSerializer
    queryset = ResourceSeekerCardAdvisoryAlliedServices.objects.all().filter(industry="Skilling")
    pagination_class = CustomPagination

class ResourceSeekerCardAdvisoryAlliedServicesRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardAdvisoryAlliedServicesSerializer
    queryset = ResourceSeekerCardAdvisoryAlliedServices.objects.all()

class ResourceProviderCardAdvisoryAlliedServicesCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardAdvisoryAlliedServicesSerializer
    queryset = ResourceProviderCardAdvisoryAlliedServices.objects.all()

class ResourceProviderCardAdvisoryAlliedServicesListView(generics.ListAPIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardAdvisoryAlliedServicesListSerializer
    queryset = ResourceProviderCardAdvisoryAlliedServices.objects.all().filter(industry="Skilling")
    pagination_class = CustomPagination

class ResourceProviderCardAdvisoryAlliedServicesRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardAdvisoryAlliedServicesSerializer
    queryset = ResourceProviderCardAdvisoryAlliedServices.objects.all()

# Infra Services
class ResourceSeekerCardInfraCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardInfraSerializer
    queryset = ResourceSeekerCardInfra.objects.all()

class ResourceSeekerCardInfraListView(generics.ListAPIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardInfraListSerializer
    queryset = ResourceSeekerCardInfra.objects.all().filter(industry="Skilling")
    pagination_class = CustomPagination

class ResourceSeekerCardInfraRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceSeekerCardInfraSerializer
    queryset = ResourceSeekerCardInfra.objects.all()

class UserProfileRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

class ResourceProviderCardInfraCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardInfraSerializer
    queryset = ResourceProviderCardInfra.objects.all()

class ConnectFormCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ConnectFormSerializer
    queryset = ConnectForm.objects.all()

class PendingVerificationsCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PendingVerificationsSerializer
    queryset = PendingVerifications.objects.all()

class ResourceProviderCardInfraListView(generics.ListAPIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardInfraListSerializer
    queryset = ResourceProviderCardInfra.objects.all().filter(industry="Skilling")
    pagination_class = CustomPagination

class ResourceProviderCardInfraRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceProviderCardInfraSerializer
    queryset = ResourceProviderCardInfra.objects.all()
