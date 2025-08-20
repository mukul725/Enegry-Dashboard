from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    def handle(self, *args, **options):
        qs = User.objects.filter(username="admin")
        if qs.exists():
            qs.delete()
            self.stdout.write(self.style.SUCCESS("Superuser 'admin' deleted."))
        else:
            self.stdout.write(self.style.WARNING("No user 'admin' found."))
