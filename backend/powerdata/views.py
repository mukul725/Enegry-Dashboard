from rest_framework import viewsets, permissions
from .models import PowerData
from .serializers import PowerDataSerializer


class PowerDataViewSet(viewsets.ModelViewSet):
    serializer_class = PowerDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == 'admin':
            # admins see all data
            return PowerData.objects.all()

        # regular users see data filtered by their assigned country/state
        queryset = PowerData.objects.all()

        if user.country:
            queryset = queryset.filter(country=user.country)
        if user.state:
            queryset = queryset.filter(state=user.state)

        return queryset

    def perform_create(self, serializer):
        # automatically assign the logged-in user to the PowerData entry
        serializer.save(user=self.request.user)
