from django.db import models

# Create your models here.
class Review(models.Model):
    text = models.CharField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    trail = models.ForeignKey(
        to='trails.Trail',
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='owned_reviews',
        null=True
    )

    def __str__(self):
        return f" Review by: {self.owner} for trail: {self.trail}"