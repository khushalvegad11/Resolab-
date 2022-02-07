from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from resolab_api.core.views import *


urlpatterns = [
    path('login/', LoginView.as_view()),
    path('register/', RegisterView.as_view()),
    path('get_presigned_url/', GetPresignedUrlS3POST.as_view()),
    path('set_profile_pic_url/', SetProfilePictureUrl.as_view()),
    path('get_user_profile/<int:pk>/', GetUserProfileView.as_view()),
    #path('get_user_profile/', GetUserProfileView.as_view()),
    path('update_user_profile/', UpdateUserProfileView.as_view()),
    path('list_jobs/', JobListView.as_view()),
    path('retrieve_job/<int:pk>/', JobRetrieveView.as_view()),
    path('list_categories/', CategoriesListView.as_view()),
    path('retrieve_category/<int:pk>/', CategoriesRetrieveView.as_view()),
    path('list_types/', TypeListView.as_view()),
    path('retrieve_type/<int:pk>/', TypeRetrieveView.as_view()),
    path('list_industries/', IndustryListView.as_view()),
    path('retrieve_industry/<int:pk>/', IndustryRetrieveView.as_view()),
    # Payments and subscriptions
    path('create_subscription/', GetSubscriptionLink.as_view()),
    path('cancel_subscription/', CancelSubscriptionView.as_view()),
    path('get_sub_history/', SubscriptionPaymentHistoryView.as_view()),
    path('get_all_sub_tnx/', SubscriptionPaymentHistoryListView.as_view()),
    path('get_sub_tnx_status/', GetCurrentStatusSubscriptionPaymentView.as_view()),
    path('subscribe/', SubscribeView.as_view()),
    path('unsubscribe/', UnsubscribeView.as_view()),
    path('get_sub_status/', GetSubscriptionStatus.as_view()),
    # Endpoints for People cards
    path('create_seeker_people/', ResourceSeekerCardPeopleCreateView.as_view()),
    path('list_seekers_people_mf/', ResourceSeekerCardPeopleListViewMf.as_view()),
    path('list_seekers_people/', ResourceSeekerCardPeopleListView.as_view()),
    path('list_seekers_people_all_both/', ResourceSeekerCardPeopleListViewAllBoth.as_view()),
    path('list_seekers_people_all_mf/', ResourceSeekerCardPeopleListViewAllMf.as_view()),
    path('list_seekers_people_all/', ResourceSeekerCardPeopleListViewAll.as_view()),
    path('modify_seeker_people/<int:pk>/', ResourceSeekerCardPeopleRetrieveUpdateDeleteView.as_view()),
    path('create_provider_people/', ResourceProviderCardPeopleCreateView.as_view()),
    path('list_providers_people_mf/', ResourceProviderCardPeopleListViewMf.as_view()),
    path('list_providers_people/', ResourceProviderCardPeopleListView.as_view()),
    path('list_providers_people_all_both/', ResourceProviderCardPeopleListViewAllBoth.as_view()),
    path('list_providers_people_all_mf/', ResourceProviderCardPeopleListViewAllMf.as_view()),
    path('list_providers_people_all/', ResourceProviderCardPeopleListViewAll.as_view()),
    path('modify_provider_people/<int:pk>/', ResourceProviderCardPeopleRetrieveUpdateDeleteView.as_view()),
    path('get_provider_people/<int:pk>/', ResourceProviderCardPeopleRetrieveView.as_view()),
    # Endpoints for Advisory and Allied Services
    # Note: adalserv is the abbreviation of advisory and allied services.
    path('create_seeker_adalserv/', ResourceSeekerCardAdvisoryAlliedServicesCreateView.as_view()),
    path('list_seekers_adalserv/', ResourceSeekerCardAdvisoryAlliedServicesListView.as_view()),
    path('modify_seeker_adalserv/<int:pk>/', ResourceSeekerCardAdvisoryAlliedServicesRetrieveUpdateDeleteView.as_view()),
    path('create_provider_adalserv/', ResourceProviderCardAdvisoryAlliedServicesCreateView.as_view()),
    path('list_providers_adalserv/', ResourceProviderCardAdvisoryAlliedServicesListView.as_view()),
    path('modify_provider_adalserv/<int:pk>/', ResourceProviderCardAdvisoryAlliedServicesRetrieveUpdateDeleteView.as_view()),
    # Endpoints for Infra Services
    # Note: infraserv is the abbreviation of infrastructure services.
    path('create_seeker_infraserv/', ResourceSeekerCardInfraCreateView.as_view()),
    path('list_seekers_infraserv/', ResourceSeekerCardInfraListView.as_view()),
    path('modify_seeker_infraserv/<int:pk>/', ResourceSeekerCardInfraRetrieveUpdateDeleteView.as_view()),
    path('modify_user_profile/<int:pk>/', UserProfileRetrieveUpdateDeleteView.as_view()),
    path('connect_form/', ConnectFormCreateView.as_view()),
    path('to_verify/', PendingVerificationsCreateView.as_view()),
    path('create_provider_infraserv/', ResourceProviderCardInfraCreateView.as_view()),
    path('list_providers_infraserv/', ResourceProviderCardInfraListView.as_view()),
    path('modify_provider_infraserv/<int:pk>/', ResourceProviderCardInfraRetrieveUpdateDeleteView.as_view()),
]


