from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from product.views import ProductView, OrderView, CartItemView, FavoriteView

router = routers.DefaultRouter()
router.register(r'products', ProductView, basename='product')
router.register(r'orders', OrderView, basename='order')
router.register(r'cart', CartItemView, basename='cart')
router.register(r'favorite', FavoriteView, basename='favorite')


urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
]
