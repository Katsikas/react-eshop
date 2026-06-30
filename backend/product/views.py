from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProductSerializer, OrderSerializer
from .models import Product, Order


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

