from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class Category(models.Model):
    cat_name = models.CharField(max_length=250)
    slug = models.SlugField(default="", blank=True, null=False, db_index=True)

    class Meta:
            verbose_name_plural = 'Categories'

    def __str__(self):
        return self.cat_name


class Tag(models.Model):
    caption= models.CharField(max_length=20)

    def __str__(self):
        return f'{self.caption}'


class Product(models.Model):   
    title = models.CharField(max_length=250)
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(1)]
    )
    description = models.CharField(max_length=500)
    category = models.ManyToManyField(Category, related_name='products')
    image = models.CharField(max_length=500, null=True, blank=True)
    rating = models.DecimalField(
       max_digits=2,
       decimal_places=1,
       validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name='tags')
    stock = models.PositiveIntegerField(default=1)
    slug = models.SlugField(default="", blank=True, null=False, db_index=True)


    @property
    def in_stock(self):
        return self.stock > 0


    def __str__(self):
        return f'{self.title}' 


class Order(models.Model):
    class StatusChoises(models.TextChoices):
        PENDING = 'Pending'
        CONFIRMED = 'Confirmed'
        CANCELLED = 'Cancelled'

    order_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=StatusChoises.choices, default=StatusChoises.PENDING)
    products = models.ManyToManyField(Product, through="OrderItem", related_name="orders")


    def __str__(self):
        return f'Order {self.order_id} by {self.user.username}'


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()


    @property
    def item_subtotal(self):
        return self.product.price + self.quantity
    
    def __str__(self):
        return f'{self.quantity} x {self.product.title} in Order {self.order.order_id}'

