from .common import TrailSerializer
from reviews.serializers.common import ReviewSerializer


class PopulatedTrailSerializer(TrailSerializer):
    reviews = ReviewSerializer(many=True)