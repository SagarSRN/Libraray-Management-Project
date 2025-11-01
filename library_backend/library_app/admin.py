from django.contrib import admin
from .models import Book, Member, Transaction

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'isbn')  

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email') 

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'book', 'member', 'issue_date', 'return_date')  


# In This file all the input are link to get all the data store in this fields