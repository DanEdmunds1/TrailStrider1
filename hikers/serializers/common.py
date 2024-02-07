from rest_framework import serializers
from ..models import Hiker

class HikerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hiker
        fields = '__all__'