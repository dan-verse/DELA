Superuser
Username: delavis
email: delavis@gmail.com
password: delavis

user
Username: test
pass: test@Abcd

testuser
testpassword123
testuser@example.com

testuser2
testpass@123
testuser2@example.com

Create Mock Data
python manage.py shell

from django.contrib.auth.models import User
from billing.models import Bill
from datetime import datetime, timedelta

user = User.objects.get(username='testuser')  # Replace with the logged-in username

bill = Bill.objects.create(
    customer=user,
    total_amount=100.00,
    remaining_balance=100.00,
    billing_date=datetime.now(),  # Add billing date
    due_date=datetime.now() + timedelta(days=30),  # Due in 30 days
    status="Pending"
)

print(bill)