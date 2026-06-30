from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from product.views import ProductView, OrderView

router = routers.DefaultRouter()
router.register(r'products', ProductView, basename='product')
router.register(r'orders', OrderView, basename='order')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
