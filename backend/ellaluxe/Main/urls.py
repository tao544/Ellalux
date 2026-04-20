from django.urls import path
from . import views

urlpatterns = [
    # Health
    path("health/", views.health_check, name="health-check"),

    # Categories
    path("categories/", views.CategoryListView.as_view(), name="category-list"),

    # Products
    path("products/", views.ProductListView.as_view(),  name="product-list"),
    path("products/featured/", views.featured_products,          name="product-featured"),
    path("products/<int:pk>/", views.ProductDetailView.as_view(),name="product-detail"),
    path("products/<int:pk>/related/", views.related_products,           name="product-related"),

    # Contact
    path("contact/", views.ContactMessageCreateView.as_view(), name="contact"),
]
