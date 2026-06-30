from django.contrib import admin
from .models import Category, Product, Tag, Order, OrderItem



class ProductAdmin(admin.ModelAdmin):
    list_filter = ['tags']
    list_display = ['title','get_tag', 'price',]
    prepopulated_fields = {'slug': ('title',)}

    def get_tag(self,obj):
        return [tag.caption for tag in obj.tags.all()]


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['cat_name']
    prepopulated_fields = {'slug': ('cat_name',)}


class TagAdmin(admin.ModelAdmin):
    list_display = ['caption']


class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'status', 'created_at', 'user']


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity']



admin.site.register(Category, CategoryAdmin)
admin.site.register(Product,ProductAdmin)
admin.site.register(Tag,TagAdmin)
admin.site.register(Order,OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
