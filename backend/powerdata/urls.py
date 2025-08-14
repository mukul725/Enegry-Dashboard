from rest_framework.routers import DefaultRouter
from .views import PowerDataViewSet

router = DefaultRouter()
router.register(r'powerdata', PowerDataViewSet, basename='powerdata')

urlpatterns = router.urls
