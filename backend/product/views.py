from rest_framework import generics
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import ProductSerializer, OrderSerializer, CartItemSerializer
from .models import Product, Order, CartItem


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer



class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer



class CartItemView(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer



class FavoriteView(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_favorite=True)
    serializer_class = ProductSerializer