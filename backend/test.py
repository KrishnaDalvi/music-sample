import os
import uuid
import requests
from flask import Flask, render_template, jsonify, request

# --- Basic Flask App Setup ---
app = Flask(__name__, template_folder='.')

# --- Cashfree Configuration ---
# IMPORTANT: Get these from your Cashfree Test Dashboard
# For production, use environment variables, not hardcoded strings.
CASHFREE_APP_ID = "TEST1074196898c3943b674bfa5a462186914701" 
CASHFREE_SECRET_KEY = "cfsk_ma_test_892122540f4fdcd712069c7778236b28_f5306824"

# Use the sandbox URL for testing
CASHFREE_API_URL = "https://sandbox.cashfree.com/pg/orders"
CASHFREE_API_VERSION = "2023-08-01"

# --- Flask Routes ---

@app.route('/')
def index():
    """
    This route serves the main HTML page.
    It looks for 'index.html' in the same directory.
    """
    return render_template('index.html')

@app.route('/create_order', methods=['POST'])
def create_order():
    """
    This endpoint creates a payment order with Cashfree and returns
    the payment_session_id to the frontend.
    """
    try:
        # Generate a unique order ID for this transaction
        order_id = f"order_{uuid.uuid4().hex}"

        # Get amount from the request, default to 1.00 if not provided
        req_data = request.get_json()
        amount = req_data.get('amount', 1.00)

        # --- Prepare the request for Cashfree API ---
        headers = {
            "Content-Type": "application/json",
            "x-api-version": CASHFREE_API_VERSION,
            "x-client-id": CASHFREE_APP_ID,
            "x-client-secret": CASHFREE_SECRET_KEY,
        }

        payload = {
            "order_id": order_id,
            "order_amount": amount,
            "order_currency": "INR",
            "customer_details": {
                "customer_id": f"customer_{uuid.uuid4().hex[:6]}",
                "customer_phone": "9999999999",
                "customer_email": "test@example.com"
            },
            "order_meta": {
                # This is the URL user will be redirected to after payment
                # {order_id} is a placeholder that Cashfree will fill
                "return_url": f"http://127.0.0.1:5000/payment/status?order_id={{order_id}}"
            }
        }

        # --- Make the API call to Cashfree ---
        response = requests.post(CASHFREE_API_URL, json=payload, headers=headers)
        response.raise_for_status()  # Raises an exception for bad status codes (4xx or 5xx)

        order_data = response.json()
        
        # --- Send the payment_session_id back to the frontend ---
        payment_session_id = order_data.get("payment_session_id")
        if not payment_session_id:
            return jsonify({"error": "Could not get payment session ID from Cashfree"}), 500

        return jsonify({"payment_session_id": payment_session_id})

    except requests.exceptions.RequestException as e:
        print(f"Cashfree API request failed: {e}")
        # Check if the response body contains more details
        error_details = e.response.json() if e.response else {}
        return jsonify({"error": "Failed to connect to payment gateway", "details": error_details}), 502
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500

# Optional: A simple route to show payment status after redirection
@app.route('/payment/status')
def payment_status():
    order_id = request.args.get('order_id')
    return f"<h1>Payment status for Order ID: {order_id}</h1><p>Here you would verify the final payment status with Cashfree's API.</p>"


if __name__ == '__main__':
    # Save the HTML content from the first block as 'index.html'
    # in the same directory as this app.py file before running.
    app.run(debug=True)
