from django.db import models


class Category(models.Model):
    name  = models.CharField(max_length=100, unique=True)
    slug  = models.SlugField(max_length=100, unique=True)
    order = models.PositiveIntegerField(default=0, help_text="Display order in filters")

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Product(models.Model):
    SIZE_CHOICES_CLOTHING = ["XS", "S", "M", "L", "XL", "XXL"]
    SIZE_CHOICES_SHOES    = ["36", "37", "38", "39", "40", "41", "42"]

    name        = models.CharField(max_length=200)
    category    = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="products")
    price       = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    details     = models.TextField(
        blank=True,
        help_text="One detail per line e.g. '100% cotton', 'Hand wash only'"
    )
    sizes       = models.CharField(
        max_length=200,
        help_text="Comma-separated sizes e.g. XS,S,M,L,XL or 36,37,38,39"
    )
    image       = models.ImageField(upload_to="products/", blank=True, null=True)
    in_stock    = models.BooleanField(default=True)
    featured    = models.BooleanField(default=False, help_text="Show on homepage featured section")
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-featured", "-created_at"]

    def __str__(self):
        return self.name

    def get_sizes_list(self):
        return [s.strip() for s in self.sizes.split(",") if s.strip()]

    def get_details_list(self):
        return [d.strip() for d in self.details.splitlines() if d.strip()]


class ContactMessage(models.Model):
    name       = models.CharField(max_length=150)
    email      = models.EmailField(blank=True)
    subject    = models.CharField(max_length=250, blank=True)
    message    = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read    = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.subject or 'No subject'} ({self.created_at:%d %b %Y})"
    

class ProductMedia(models.Model):
    MEDIA_TYPE = (
        ("image", "Image"),
        ("video", "Video"),
    )

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="media")
    file = models.FileField(upload_to="products/media/")
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPE, default="image")

    def __str__(self):
        return f"{self.product.name} - {self.media_type}" 



    
