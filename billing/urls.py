from django.urls import path
from .views import (
    api_root,
    BillUpdateView,
    UserBillListView,
    UserProfileUpdateView,
    UserRegistrationView,
    PaymentCreateView,
    AdminUserListView,
    AdminBillCreateView,
    admin_export_bills_view,
)

urlpatterns = [
    # API Root
    path('', api_root, name='api-root'),
    
    # Admin endpoints
    path('admin/bills/<int:pk>/', BillUpdateView.as_view(), name='bill-update'),
    path('admin/users/', AdminUserListView.as_view(), name='admin-users'),
    path('admin/bills/', AdminBillCreateView.as_view(), name='admin-bill-create'),
    path('admin/export-bills/', admin_export_bills_view, name='admin-export-bills'),
    
    # User endpoints
    path('user/bills/', UserBillListView.as_view(), name='user-bills'),
    path('user/payments/', PaymentCreateView.as_view(), name='payment-create'),
    path('user/profile/', UserProfileUpdateView.as_view(), name='user-profile'),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
]