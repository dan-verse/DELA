from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Customer, MeterReading, Bill, Payment

# Add Customer inline to User admin
class CustomerInline(admin.StackedInline):
    model = Customer
    can_delete = False
    verbose_name_plural = 'Customers'

# Extend UserAdmin to include CustomerInline
class CustomUserAdmin(UserAdmin):
    inlines = (CustomerInline,)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

# Register all other models
admin.site.register(MeterReading)
admin.site.register(Bill)
admin.site.register(Payment)
admin.site.register(Customer)
