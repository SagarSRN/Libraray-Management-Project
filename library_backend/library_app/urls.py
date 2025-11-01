from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, MemberViewSet, TransactionViewSet, import_books, home

router = DefaultRouter()
router.register('books', BookViewSet)
router.register('members', MemberViewSet)
router.register('transactions', TransactionViewSet)

urlpatterns = [
    path('', home),
    path('', include(router.urls)),
    path('import-books/', import_books),
]

# Home, Book, Transaction of DRF ModelsviewSet in this library backend 