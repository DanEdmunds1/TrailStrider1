from django.db import models


ATHLETIC_ABILITY = (
    ('2', "Casual Stroller"),
    ('3', "Average Pace"),
    ('4', "On a Mission")
)

# Create your models here.
class Hiker(models.Model):
    name = models.CharField(max_length=100)
    height = models.FloatField()
    picture = models.CharField(null=True, blank=True, max_length=100000)
    ability = models.CharField(
        max_length = 30,
        choices = ATHLETIC_ABILITY,
        default = 2
    )
    owner = models.ForeignKey(
        to='users.User',
        on_delete=models.CASCADE,
        related_name='hikers',
        null=True
    )

    def __str__(self):
        return f"{self.name} - {self.ability} - {self.owner}"
 