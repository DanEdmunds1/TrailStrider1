from .common import ReviewSerializer
from trails.serializers.common import TrailSerializer
from users.serializers.common import UserSerializer

class PopulatedReviewSerializer(ReviewSerializer):
    owner = UserSerializer()
    trail = TrailSerializer()