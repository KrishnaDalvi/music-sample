# Cashfree Payment Gateway Setup

This guide will help you set up Cashfree payment gateway for the application.

## 🔧 Setup Instructions

### 1. Create Cashfree Account
1. Go to [Cashfree Developer Portal](https://www.cashfree.com/developers)
2. Sign up for a developer account
3. Create a new app in the dashboard

### 2. Get API Credentials
1. In your Cashfree dashboard, go to "API Keys"
2. Copy your **App ID** and **Secret Key**
3. For testing, use the sandbox credentials
4. For production, use the live credentials

### 3. Environment Variables
Create a `.env` file in the backend directory:

```bash
# Cashfree Configuration
CASHFREE_APP_ID=your_app_id_here
CASHFREE_SECRET_KEY=your_secret_key_here

# For testing (sandbox)
CASHFREE_APP_ID=TEST123456789
CASHFREE_SECRET_KEY=TEST123456789

# For production (live)
CASHFREE_APP_ID=your_live_app_id
CASHFREE_SECRET_KEY=your_live_secret_key
```

### 4. Update Backend Configuration
The backend is already configured to use environment variables. If you want to use hardcoded values for testing, you can modify `backend/app.py`:

```python
# For testing (current setup)
CASHFREE_APP_ID = os.getenv('CASHFREE_APP_ID', 'TEST123456789')
CASHFREE_SECRET_KEY = os.getenv('CASHFREE_SECRET_KEY', 'TEST123456789')
CASHFREE_API_URL = "https://sandbox.cashfree.com/pg"

# For production
CASHFREE_API_URL = "https://api.cashfree.com/pg"
```

## 🧪 Testing

### Test Payment Flow
1. Start the backend: `python app.py`
2. Start the frontend: `npm run dev`
3. Add items to cart
4. Click "Proceed to Checkout"
5. Click "Proceed to Payment"
6. Use test card details:
   - Card Number: `4111 1111 1111 1111`
   - Expiry: Any future date
   - CVV: Any 3 digits
   - OTP: `123456`

### Test API Endpoints
```bash
# Test payment creation
curl -X POST http://localhost:5000/api/create-payment \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "orderId": "ORDER_123456",
    "customerName": "John Doe",
    "customerEmail": "john@example.com"
  }'

# Test payment status
curl -X POST http://localhost:5000/api/payment-status \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORDER_123456"
  }'
```

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables for production
- Enable webhook notifications for payment status updates
- Implement proper error handling
- Add rate limiting for production

## 📱 Features

### Payment Gateway Features
- ✅ Secure payment processing
- ✅ Multiple payment methods (cards, UPI, netbanking)
- ✅ Real-time payment status
- ✅ Order management
- ✅ Customer details collection
- ✅ Responsive payment interface

### Integration Features
- ✅ Seamless checkout flow
- ✅ Order summary display
- ✅ Payment success/failure handling
- ✅ Thank you page with order details
- ✅ Back to home navigation

## 🚀 Production Deployment

For production deployment:

1. **Update API URLs**: Change from sandbox to live URLs
2. **Use Live Credentials**: Replace test credentials with live ones
3. **Enable Webhooks**: Set up webhook endpoints for payment notifications
4. **SSL Certificate**: Ensure HTTPS for payment pages
5. **Error Handling**: Implement comprehensive error handling
6. **Logging**: Add payment transaction logging
7. **Monitoring**: Set up payment success/failure monitoring

## 📞 Support

- Cashfree Documentation: https://docs.cashfree.com/
- Cashfree Support: https://www.cashfree.com/contact-us
- API Status: https://status.cashfree.com/ 