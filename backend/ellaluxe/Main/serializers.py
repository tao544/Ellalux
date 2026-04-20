from rest_framework import serializers
from .models import Category, Product, ContactMessage, ProductMedia


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model  = Category
        fields = ["id", "name", "slug", "order", "product_count"]

    def get_product_count(self, obj):
        return obj.products.filter(in_stock=True).count()


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for product cards in grid views."""
    category_name = serializers.CharField(source="category.name", read_only=True)
    image_url     = serializers.SerializerMethodField()
    sizes         = serializers.SerializerMethodField()

    class Meta:
        model  = Product
        fields = [
            "id", "name", "category", "category_name",
            "price", "in_stock", "featured",
            "image_url", "sizes",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

    def get_sizes(self, obj):
        return obj.get_sizes_list()


class ProductMediaSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductMedia
        fields = ["id", "media_type", "file_url"]

    def get_file_url(self, obj):
        request = self.context.get("request")
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return None

class ProductDetailSerializer(serializers.ModelSerializer):
    """Full serializer for the product detail page."""
    category_name = serializers.CharField(source="category.name", read_only=True)
    image_url     = serializers.SerializerMethodField()
    sizes         = serializers.SerializerMethodField()
    details       = serializers.SerializerMethodField()
    media         = ProductMediaSerializer(many=True, read_only=True)

    class Meta:
        model  = Product
        fields = [
            "id", "name", "category", "category_name",
            "price", "description", "details",
            "in_stock", "featured",
            "image_url", "sizes",
            "media",
            "created_at", "updated_at",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

    def get_sizes(self, obj):
        return obj.get_sizes_list()

    def get_details(self, obj):
        return obj.get_details_list()


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ContactMessage
        fields = ["id", "name", "email", "subject", "message", "created_at"]
        read_only_fields = ["id", "created_at"]


