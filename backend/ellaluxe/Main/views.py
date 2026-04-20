from rest_framework import generics, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q

from .models import Category, Product, ContactMessage
from .serializers import (
    CategorySerializer,
    ProductListSerializer,
    ProductDetailSerializer,
    ContactMessageSerializer,
)


# ─── Categories ───────────────────────────────────────────────
class CategoryListView(generics.ListAPIView):
    """GET /api/categories/ — all categories with product counts"""
    queryset         = Category.objects.all()
    serializer_class = CategorySerializer


# ─── Products ─────────────────────────────────────────────────
class ProductListView(generics.ListAPIView):
    """
    GET /api/products/
    Query params:
      ?category=gowns        filter by category slug
      ?in_stock=true         only in-stock items
      ?featured=true         only featured items
      ?search=slit           search name + description
    """
    serializer_class = ProductListSerializer
    filter_backends  = [filters.SearchFilter, filters.OrderingFilter]
    search_fields    = ["name", "description", "category__name"]
    ordering_fields  = ["price", "created_at", "name"]
    ordering         = ["-featured", "-created_at"]

    def get_queryset(self):
        qs = Product.objects.select_related("category").all()

        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(
                Q(category__slug=category) | Q(category__name__iexact=category)
            )

        in_stock = self.request.query_params.get("in_stock")
        if in_stock and in_stock.lower() == "true":
            qs = qs.filter(in_stock=True)

        featured = self.request.query_params.get("featured")
        if featured and featured.lower() == "true":
            qs = qs.filter(featured=True)

        return qs


class ProductDetailView(generics.RetrieveAPIView):
    """GET /api/products/<id>/"""
    queryset         = Product.objects.select_related("category").all()
    serializer_class = ProductDetailSerializer


@api_view(["GET"])
def featured_products(request):
    """GET /api/products/featured/ — homepage featured items"""
    products = Product.objects.filter(featured=True, in_stock=True).select_related("category")[:8]
    serializer = ProductListSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(["GET"])
def related_products(request, pk):
    """GET /api/products/<id>/related/ — same category, different product"""
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    related = (
        Product.objects
        .filter(category=product.category, in_stock=True)
        .exclude(pk=pk)
        .select_related("category")[:4]
    )
    serializer = ProductListSerializer(related, many=True, context={"request": request})
    return Response(serializer.data)


# ─── Contact ──────────────────────────────────────────────────
class ContactMessageCreateView(generics.CreateAPIView):
    """POST /api/contact/ — save a contact message from the website form"""
    queryset         = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = []  # public endpoint — no auth needed

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"success": True, "message": "Your message has been received. We'll be in touch soon!"},
            status=status.HTTP_201_CREATED,
        )


# ─── Health check ─────────────────────────────────────────────
@api_view(["GET"])
def health_check(request):
    """GET /api/health/ — quick check that the API is running"""
    return Response({"status": "ok", "brand": "EllàLuxe API v1"})
