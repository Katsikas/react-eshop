from rest_framework import serializers
from .models import Product, Category, Tag, Order, OrderItem, CartItem


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



class CartItemSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='product.title', read_only=True)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, source='product.price', read_only=True)
    image = serializers.CharField(source='product.image', read_only=True)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = CartItem
        fields = ('id','product', 'title', 'price', 'image', 'quantity', 'item_subtotal')

    def create(self, validated_data):
        product = validated_data['product']
        quantity = validated_data['quantity']
        

        cart_item, created = CartItem.objects.get_or_create(
            product = product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return cart_item
    



