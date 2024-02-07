from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Trail
from .serializers.common import TrailSerializer
from .serializers.populated import PopulatedTrailSerializer
from lib.views import OwnerListCreateView
from lib.permissions import IsOwnerOrReadOnly

# Create your views here.

# Path: /trails/
# Methods: GET, POST
class TrailListCreateView(OwnerListCreateView):
    queryset = Trail.objects.all()
    serializer_class = TrailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# Path: /trails/:id/
# Methods: GET, PUT, PATCH, DELETE
class TrailDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Trail.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        print('Self Request Method -->', self.request.method)
        if self.request.method == 'PUT':
            return TrailSerializer
        return PopulatedTrailSerializer