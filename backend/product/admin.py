from django.contrib import admin
from .models import Category, Product



class ProductAdmin(admin.ModelAdmin):
    list_display = ['title','price',]
    prepopulated_fields = {'slug': ('title',)}

    def get_category(self):
        print(self)


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['cat_name']
    prepopulated_fields = {'slug': ('cat_name',)}


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product,ProductAdmin)
