from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from resolab_api.verification.views import *

urlpatterns = [
    path('login/', StaffLoginView.as_view()),
    path('register/', StaffRegisterView.as_view()),
    path('get_unverified_seekers/', GetUnverifiedSeekersView.as_view()),
    path('get_unverified_providers/', GetUnverifiedProvidersView.as_view()),
    path('verify_seeker/', MarkVerifiedSeekerView.as_view()),
    path('verify_provider/', MarkVerifiedProviderView.as_view()),
    path('retrieve-individual-subscription/', RetrieveIndividualSubscriptionPlan.as_view(), name='retrieve_individual_subscription'),
    path('retrieve-institutional-subscription/', RetrieveInstitutionalSubscriptionPlan.as_view(), name='retrieve_institutional_subscription'),
    path('checkout-subscription-data/', CheckoutSubscriptionData.as_view(), name='checkout_subscription_data'),
    path('subscription-callback-endpoint/', SubscriptionCallbackEndpoint.as_view(), name='subscription_callback_endpoint'),
    path('is-user-subscribed/', IsUserSubscribed.as_view(), name='is_user_subscribed'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
