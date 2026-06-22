from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator



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
        validators=[MinValueValidator(0.01)]
    )
    description = models.CharField(max_length=500)
    category = models.ManyToManyField(Category)
    image = models.CharField(max_length=500, null=True, blank=True)
    rating = models.DecimalField(
       max_digits=2,
       decimal_places=1,
       validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    tags = models.ManyToManyField(Tag, related_name='tag')
    slug = models.SlugField(default="", blank=True, null=False, db_index=True)



    def __str__(self):
        return f'{self.title} {self.tags}' 
