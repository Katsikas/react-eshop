from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProductSerializer
from .models import Product, Category


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer




