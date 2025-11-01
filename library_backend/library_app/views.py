from django.shortcuts import render
from .models import Book, Member, Transaction
from .serializers import BookSerializer, MemberSerializer, TransactionSerializer
import requests
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    
def home(request):
    return HttpResponse("Welcome to the Library Management API!")   


 
@api_view(['GET'])
def import_books(request):
    title = request.GET.get('title', '')
    page = request.GET.get('page', 1)
    url = "https://frappe.io/api/method/frappe-library"
    params = {"title": title, "page": page}

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json().get('message', [])
    except requests.exceptions.RequestException as e:
        print("Error fetching data:", e)
        return Response(
            {"status": "error", "message": "Failed to fetch data from Frappe API."},
            status=500
        )

    # 🟡 If no books found
    if not data:
        return Response(
            {"status": "not_found", "message": f"No books found for '{title}'."},
            status=200
        )

    imported_count = 0
    for item in data:
        _, created = Book.objects.get_or_create(
            title=item.get('title', 'Unknown'),
            author=item.get('authors', 'Unknown'),
            isbn=item.get('isbn', 'N/A'),
            publisher=item.get('publisher', ''),
            quantity=5
        )
        if created:
            imported_count += 1

    return Response({
        "status": "success",
        "message": f"Imported {imported_count} books successfully.",
        "imported": imported_count
    })
