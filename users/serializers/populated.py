from .common import RegistrationSerializer
from hikers.serializers.common import HikerSerializer

class PopulatedUserSerializer(RegistrationSerializer):
    hikers = HikerSerializer(many=True)
    