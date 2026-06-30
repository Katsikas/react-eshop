from rest_framework import serializers
from .models import Product, Category, Tag, Order, OrderItem


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'



class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'



class ProductSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True, source='category')
    all_tags = TagSerializer(many=True, read_only=True, source='tags')
    
    class Meta:
        model = Product
        exclude=('category','tags',)



class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.title')
    product_price = serializers.DecimalField(max_digits=10, decimal_places=2, source='product.price')

    class Meta:
        model = OrderItem
        fields = ('product_name', 'product_price', 'quantity', 'item_subtotal')



class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True) 
    total_price = serializers.SerializerMethodField()

    def get_total_price(self,obj):
        order_items = obj.items.all()
        return sum(order_item.item_subtotal for order_item in order_items)


    class Meta:
        model = Order
        fields = ('order_id','created_at','user','status', 'items','total_price')


