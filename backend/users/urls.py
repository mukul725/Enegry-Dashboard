from django.urls import path
from .views import UserListView, UserCreateView, UserDetailView, MyTokenObtainPairView
from rest_framework_simplejwt.views import (

    TokenRefreshView,
)


urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/create/', UserCreateView.as_view(), name='user-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('token/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(),
         name='token_refresh'),

]
