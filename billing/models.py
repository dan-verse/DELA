from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from decimal import Decimal

# Customer Model
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=255)  # Customer's address
    phone_number = models.CharField(max_length=15)  # Customer's phone number

    def __str__(self):
        return self.user.username  # Display the customer's name in the admin panel

# MeterReading Model
class MeterReading(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)  # Link to Customer
    reading_date = models.DateField()  # Date of the meter reading
    reading_value = models.IntegerField()  # Value of the meter reading

    def __str__(self):
        return f"Meter Reading for {self.customer.username} on {self.reading_date}"

# Bill Model
class Bill(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to User model
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=100.00)  # Default bill amount
    remaining_balance = models.DecimalField(max_digits=10, decimal_places=2, default=100.00)  # Default remaining balance
    billing_date = models.DateField(default=datetime.now)
    due_date = models.DateField()  # Due date for the bill
    status = models.CharField(max_length=50, default="Pending")  # Bill status (e.g., Paid, Pending)

    def __str__(self):
        return f"Bill for {self.customer.username} on {self.due_date}"

# Payment Model
class Payment(models.Model):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)  # Link to Bill
    payment_date = models.DateField()  # Date of payment
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)  # Amount paid
    payment_method = models.CharField(max_length=50)  # Payment method (e.g., Credit Card, Mobile Money)

    def save(self, *args, **kwargs):

        print(f"Before payment: Bill.remaining_balance = {self.bill.remaining_balance}, Payment = {self.payment_amount}")

        # Update the bill's remaining balance
        self.bill.remaining_balance = Decimal(self.bill.remaining_balance) - Decimal(self.payment_amount)

        # Update the bill status
        if self.bill.remaining_balance <= 0:
            self.bill.status = "Paid"
        else:
            self.bill.status = "Partially Paid"

        # Save the updated bill
        self.bill.save()

        # Save the payment
        super().save(*args, **kwargs)

        print(f"After payment: Bill.remaining_balance = {self.bill.remaining_balance}")

    def __str__(self):
        return f"Payment for Bill {self.bill.id} on {self.payment_date}"

# User Model (for authentication)
class User(models.Model):
    username = models.CharField(max_length=255)  # Username
    password_hash = models.CharField(max_length=255)  # Hashed password
    role = models.CharField(max_length=50)  # User role (e.g., Admin, Customer)

    def __str__(self):
        return self.username