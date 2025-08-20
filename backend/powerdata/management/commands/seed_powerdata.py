from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from powerdata.models import PowerData
from django.utils import timezone

User = get_user_model()


class Command(BaseCommand):
    help = "Seed initial PowerData rows"

    def handle(self, *args, **kwargs):
        # Get superuser (or fallback to first user)
        user = User.objects.filter(is_superuser=True).first()
        if not user:
            self.stdout.write(self.style.ERROR(
                "❌ No superuser found. Create one first."))
            return

        if PowerData.objects.exists():
            self.stdout.write(self.style.WARNING(
                "⚠️ PowerData already exists, skipping."))
            return

        # Insert some sample rows
        PowerData.objects.create(
            user=user,
            country="USA",
            state="California",
            city="Los Angeles",
            generation_mw=500.0,
            consumption_mw=450.0,
            distribution_loss=50.0,
        )
        PowerData.objects.create(
            user=user,
            country="India",
            state="Maharashtra",
            city="Mumbai",
            generation_mw=800.0,
            consumption_mw=700.0,
            distribution_loss=100.0,
        )
        PowerData.objects.create(
            user=user,
            country="Germany",
            state="Bavaria",
            city="Munich",
            generation_mw=600.0,
            consumption_mw=550.0,
            distribution_loss=50.0,
        )

        self.stdout.write(self.style.SUCCESS(
            "✅ Seed PowerData inserted successfully!"))
