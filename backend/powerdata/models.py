from django.db import models
from django.conf import settings


class PowerData(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    generation_mw = models.FloatField()
    consumption_mw = models.FloatField()
    distribution_loss = models.FloatField(blank=True, null=True)  # optional

    def __str__(self):
        return f"{self.city} - {self.date}"
