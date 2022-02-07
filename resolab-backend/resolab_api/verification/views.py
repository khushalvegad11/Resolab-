import razorpay
import traceback
import time
import os
from datetime import datetime ,timedelta
from django.shortcuts import render, redirect
from django.urls import reverse
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK , HTTP_404_NOT_FOUND
from rest_framework import generics
from resolab_api.core.serializers import ResourceSeekerCardPeopleListSerializer, ResourceProviderCardPeopleListSerializer
from resolab_api.core.models import ResourceSeekerCardPeople, ResourceProviderCardPeople
from resolab_api.verification.models import *
from resolab_api.verification.permissions import *
from resolab_api.verification.serializers import *
from resolab_api.core.serializers import *
from django.views.generic import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect
from resolab_api.core.models import *
from rest_framework.views import APIView
import pytz

utc=pytz.UTC



# Create your views here.

razorpay_client = razorpay.Client(
    auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))

class StaffRegisterView(generics.GenericAPIView):
    serializer_class = StaffRegisterSerializer

    def post(self, request):
        self.serializer = self.get_serializer(data=request.data)
        self.serializer.is_valid(raise_exception=True)
        self.serializer.save()
        return Response({
            'response': 'User Registered!'
        }, HTTP_200_OK)

class StaffLoginView(generics.GenericAPIView):
    serializer_class = StaffLoginSerializer

    def post(self, request):
        self.serializer = self.get_serializer(data=request.data)
        self.serializer.is_valid(raise_exception=True)
        token = self.serializer.get_token()
        return Response({
            'response': token
        }, HTTP_200_OK)

class GetUnverifiedSeekersView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsStaff]
    serializer_class = ResourceSeekerCardPeopleListSerializer

    def get_queryset(self):
        return ResourceSeekerCardPeople.objects.filter(is_verified=False)

class GetUnverifiedProvidersView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsStaff]
    serializer_class = ResourceProviderCardPeopleListSerializer

    def get_queryset(self):
        return ResourceProviderCardPeople.objects.filter(is_verified=False)

class MarkVerifiedSeekerView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, IsStaff]
    serializer_class = VerifySeekerCardSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.verify_card()
        return Response({
            'response': 'Success!'
        }, HTTP_200_OK)

class MarkVerifiedProviderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, IsStaff]
    serializer_class = VerifyProviderCardSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.verify_card()
        return Response({
            'response': 'Success!'
        }, HTTP_200_OK)


class RetrieveIndividualSubscriptionPlan(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = RetrieveSubscriptionPlanSerializer
    queryset = SubscriptionPlan.objects.filter(plan_category='individual', active=True)


class RetrieveInstitutionalSubscriptionPlan(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = RetrieveSubscriptionPlanSerializer
    queryset = SubscriptionPlan.objects.filter(plan_category='institutional', active=True)


class CheckoutSubscriptionData(generics.views.APIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = CheckoutSubscriptionDataSerializer
    api_views = ["POST"]

    def post(self, request):
        try:
            subscription_plan_id = request.data.get('subscription_plan_id')
            subscription_plan_obj = SubscriptionPlan.objects.get(pk=subscription_plan_id)
            amount = subscription_plan_obj.plan_amount
            amount = amount*100
            amount = amount + ((amount * subscription_plan_obj.tax)/100)
            currency = subscription_plan_obj.currency
            user_prof = UserProfile.objects.get(user=request.user)
            order_dict = {'amount':amount , 'currency':currency , 'payment_capture':'0', 'notes':{'plan_id':subscription_plan_id , 'order_by':user_prof.id}}
            razorpay_order = razorpay_client.order.create(order_dict)
            
            if request.is_secure():
                request_method = "https"
            else:
                request_method = "http"
            
            request_host = request.get_host()
            full_host = request_method + "://" + request_host
            
            callback_url =  full_host + reverse('subscription_callback_endpoint')

            data = {
                'key': settings.RAZOR_KEY_ID,
                'amount': amount,
                'currency': currency,
                'name': 'Resolab Pvt. Ltd.',
                'callback_url': callback_url,
                'order_id': razorpay_order.get('id')
            }
               
            return Response(data, 200)
           
        except Exception as error:
            return Response({'response': str(error)}, 401)
        

@method_decorator(csrf_exempt, name='dispatch')
class SubscriptionCallbackEndpoint(View):
    def post(self, request):
        try:
            # get the required parameters from post request.
            payment_id = request.POST.get('razorpay_payment_id', '')
            razorpay_order_id = request.POST.get('razorpay_order_id', '')
            signature = request.POST.get('razorpay_signature', '')
            params_dict = {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': payment_id,
                'razorpay_signature': signature
            }
            result = razorpay_client.utility.verify_payment_signature(params_dict)

            if result is None:
                
                amount = razorpay_client.order.fetch(razorpay_order_id).get('amount')
                order_notes = razorpay_client.order.fetch(razorpay_order_id).get('notes')
                plan_id = order_notes.get('plan_id')  
                user_id = order_notes.get('order_by')  
                epoch_time = razorpay_client.order.fetch(razorpay_order_id).get('created_at')
                created_at = datetime.fromtimestamp(epoch_time)
                
                order_data = {
                    'order_id': razorpay_order_id,
                    'plan_id': plan_id,
                    'amount': amount,
                    'currency': 'INR',
                    'amount_unit': 'paise',
                    'status': 'pending',
                    'order_by': user_id,
                    'created_at': created_at,
                    'updated_at': datetime.now(),
                }
                
                order_serializer = SubscriptionOrderSerializer(data=order_data)
                
                if order_serializer.is_valid():
                    order_serializer.save() 
                
                try:
                    razorpay_response =  razorpay_client.payment.capture(payment_id, amount)
                    card = razorpay_response.pop('card')
                    new_card_dict = dict()
                    [new_card_dict.update({"card_"+key: i}) for key, i in card.items()]

                    razorpay_response.update(new_card_dict)
                    razorpay_response['amount_unit'] = 'paise'
                    razorpay_response['payment_id'] = razorpay_response['id']


                    if razorpay_response.get('notes'):
                        notes_list = [str(j) for i, j  in razorpay_response.get('notes').items()]
                        razorpay_response['notes'] = ", ".join(notes_list)
                    else:
                        razorpay_response['notes'] = ""
                        
                    epoch_time = razorpay_response.get('created_at')
                    created_at = datetime.fromtimestamp(epoch_time)
                    razorpay_response['created_at'] = created_at
                    razorpay_serializer = SubscriptionPaymentSerializer(data=razorpay_response)
                    
                    if razorpay_serializer.is_valid():
                        razorpay_serializer.save()
                        
                        
                        plan = SubscriptionPlan.objects.get(pk=plan_id)
                        plan_category = plan.plan_category
                        plan_duation = plan.plan_duration
                        
                        if plan_duation == 'monthly':
                            days = 30
                        elif plan_duation == 'quarterly':
                            days = 90
                        elif plan_duation == 'semiannual':
                            days = 180
                        elif plan_duation == 'annual':
                            days = 360
                            
                        user_subscription_data = {
                            'plan_id' : plan_id ,
                            'user_id' : user_id , 
                            'is_expired' : False ,
                            'start_date' : created_at , 
                            'end_date' :  created_at + timedelta(days=days) , 
                            'created_at' : created_at , 
                            'updated_at' : datetime.now(),
                            'is_newly_registered' : False ,
                        }
                        
                        user_subscription_serializer = UserSubscriptionSerializer(data=user_subscription_data)
                        if user_subscription_serializer.is_valid():
                            user_subscription_serializer.save()
                    else:
                        return HttpResponseRedirect("http://www.resolabindia.com/Payment")

                    return HttpResponseRedirect("http://www.resolabindia.com/Payment")
                    
                except:
                    return HttpResponseRedirect("http://www.resolabindia.com/Payment")
            else:
                return HttpResponseRedirect("http://www.resolabindia.com/Payment")
        except:
            return HttpResponseRedirect("http://www.resolabindia.com/Payment")


class IsUserSubscribed(APIView):
    def get(self ,request):
        try:
            current_date = datetime.now()
            current_date = utc.localize(current_date)
            user_profile = UserProfile.objects.get(user=request.user)
            user_subscriptions = UserSubscription.objects.filter(start_date__lte=current_date , end_date__gte=current_date , user_id=user_profile)
            
            if user_subscriptions:
                return Response({'is_user_subscribed':True} , status=HTTP_200_OK)
            return Response({'is_user_subscribed':False} , status=HTTP_200_OK)
        
        except Exception as error:
            return Response({'is_user_subscribed':False} , status=HTTP_200_OK)