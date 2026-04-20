from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, ContactMessage, ProductMedia


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display  = ["name", "slug", "order", "product_count"]
    prepopulated_fields = {"slug": ("name",)}
    ordering      = ["order", "name"]

    def product_count(self, obj):
        count = obj.products.count()
        return format_html('<b>{}</b> products', count)
    product_count.short_description = "Products"

class ProductMediaInline(admin.TabularInline):
    model = ProductMedia
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductMediaInline]
    list_display   = [
        "product_image_thumb", "name", "category",
        "price_display", "in_stock", "featured", "updated_at"
    ]
    list_display_links = ["product_image_thumb", "name"]
    list_filter    = ["category", "in_stock", "featured"]
    search_fields  = ["name", "description"]
    list_editable  = ["in_stock", "featured"]
    ordering       = ["-featured", "-created_at"]
    readonly_fields = ["created_at", "updated_at", "product_image_preview"]

    fieldsets = (
        ("Basic Info", {
            "fields": ("name", "category", "price", "in_stock", "featured")
        }),
        ("Product Image", {
            "fields": ("image", "product_image_preview"),
        }),
        ("Description & Details", {
            "fields": ("description", "details"),
            "description": "Enter 'details' as one item per line e.g. '100% cotton'"
        }),
        ("Sizes", {
            "fields": ("sizes",),
            "description": "Enter comma-separated sizes e.g. XS,S,M,L,XL or 36,37,38,39,40"
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",),
        }),
    )

    def price_display(self, obj):
        try:
            return format_html("₦{:,.0f}", float(obj.price))
        except (TypeError, ValueError):
            return "₦0"
    price_display.short_description = "Price"
    price_display.admin_order_field = "price"

    def product_image_thumb(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width:48px;height:60px;object-fit:cover;border-radius:2px;" />',
                obj.image.url
            )
        return format_html('<span style="color:#ccc;">No image</span>')
    product_image_thumb.short_description = "Photo"

    def product_image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width:300px;max-height:380px;object-fit:cover;border-radius:4px;" />',
                obj.image.url
            )
        return "No image uploaded yet."
    product_image_preview.short_description = "Image Preview"


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display  = ["name", "subject", "email", "is_read", "created_at"]
    list_filter   = ["is_read"]
    search_fields = ["name", "email", "subject", "message"]
    list_editable = ["is_read"]
    readonly_fields = ["name", "email", "subject", "message", "created_at"]
    ordering      = ["-created_at"]

    def has_add_permission(self, request):
        return False  # Messages only come from the website form


