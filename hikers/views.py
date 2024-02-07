from rest_framework.generics import DestroyAPIView
from .serializers.common import HikerSerializer
from .models import Hiker
from lib.views import OwnerListCreateView
from lib.permissions import IsOwnerOrReadOnly


# Path:/hikers/
# Methods: GET, POST
class HikerCreateView(OwnerListCreateView):
    queryset = Hiker.objects.all()
    serializer_class = HikerSerializer

# Path: /hikers/:pk/
# Methods: DELETE
class HikerDestroyView(DestroyAPIView):
    queryset = Hiker.objects.all()
    serializer_class = HikerSerializer
    permission_classes = [IsOwnerOrReadOnly]