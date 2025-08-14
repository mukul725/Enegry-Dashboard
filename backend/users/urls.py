from django.urls import path
from .views import UserListView, UserCreateView, MyTokenObtainPairView
from rest_framework_simplejwt.views import (

    TokenRefreshView,
)


urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/create/', UserCreateView.as_view(), name='user-create'),
    path('token/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(),
         name='token_refresh'),
]
