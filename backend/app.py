from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore, auth
import os
from datetime import datetime
import requests
import uuid

app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin SDK
try:
    cred = credentials.Certificate("firebase-service-account.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
except Exception as e:
    print(f"Failed to initialize Firebase: {e}")
    db = None

# --- START: CASHFREE CONFIGURATION ---
CASHFREE_APP_ID = "TEST1074196898c3943b674bfa5a462186914701" 
CASHFREE_SECRET_KEY = "cfsk_ma_test_892122540f4fdcd712069c7778236b28_f5306824"
CASHFREE_API_URL = "https://sandbox.cashfree.com/pg/orders"
CASHFREE_API_VERSION = "2023-08-01"
# --- END: CASHFREE CONFIGURATION ---


@app.route('/api/signup', methods=['POST'])
def signup():
    if not db:
        return jsonify({'error': 'Firestore not initialized'}), 500
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('firstName')
        last_name = data.get('lastName')

        if not all([email, password, first_name, last_name]):
            return jsonify({'error': 'All fields are required'}), 400

        user = auth.create_user(
            email=email,
            password=password,
            display_name=f"{first_name} {last_name}"
        )

        user_data = {
            'uid': user.uid,
            'email': email,
            'firstName': first_name,
            'lastName': last_name,
            'createdAt': datetime.now(),
            'lastLogin': datetime.now()
        }
        db.collection('users').document(user.uid).set(user_data)
        
        custom_token = auth.create_custom_token(user.uid)

        return jsonify({
            'success': True,
            'message': 'User created successfully',
            'user': {
                'uid': user.uid,
                'email': email,
                'firstName': first_name,
                'lastName': last_name,
            },
            'token': custom_token.decode('utf-8')
        }), 201

    except auth.EmailAlreadyExistsError:
        return jsonify({'error': 'Email already exists'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    if not db:
        return jsonify({'error': 'Firestore not initialized'}), 500
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400

        user = auth.get_user_by_email(email)
        
        user_ref = db.collection('users').document(user.uid)
        user_doc = user_ref.get()
        
        if user_doc.exists:
            user_data = user_doc.to_dict()
            user_ref.update({'lastLogin': datetime.now()})
            
            custom_token = auth.create_custom_token(user.uid)
            
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'user': {
                    'uid': user.uid,
                    'email': user.email,
                    'firstName': user_data.get('firstName', ''),
                    'lastName': user_data.get('lastName', ''),
                },
                'token': custom_token.decode('utf-8')
            }), 200
        else:
            return jsonify({'error': 'User data not found'}), 404

    except auth.UserNotFoundError:
        return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/<uid>', methods=['GET'])
def get_user(uid):
    if not db:
        return jsonify({'error': 'Firestore not initialized'}), 500
    try:
        user_doc = db.collection('users').document(uid).get()
        if user_doc.exists:
            return jsonify({'success': True, 'user': user_doc.to_dict()}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/create_order', methods=['POST'])
def create_order():
    if not db:
        return jsonify({'error': 'Firestore not initialized'}), 500
    try:
        data = request.get_json()
        uid = data.get('uid')
        amount = data.get('amount')

        if not uid or not amount:
            return jsonify({'error': 'User ID and amount are required'}), 400

        user_doc = db.collection('users').document(uid).get()
        if not user_doc.exists:
            return jsonify({'error': 'User not found'}), 404
        
        user_data = user_doc.to_dict()
        order_id = f"order_{uuid.uuid4().hex}"

        headers = {
            "Content-Type": "application/json",
            "x-api-version": CASHFREE_API_VERSION,
            "x-client-id": CASHFREE_APP_ID,
            "x-client-secret": CASHFREE_SECRET_KEY,
        }

        payload = {
            "order_id": order_id,
            "order_amount": float(amount),
            "order_currency": "INR",
            "customer_details": {
                "customer_id": uid,
                "customer_email": user_data.get('email'),
                "customer_phone": "9999999999", 
            },
            "order_meta": {
                # --- THIS IS THE FIX ---
                # Changed port from 3000 to 5174 to match your React frontend
                "return_url": f"http://localhost:5174/payment/status?order_id={{order_id}}"
            }
        }

        response = requests.post(CASHFREE_API_URL, json=payload, headers=headers)
        response.raise_for_status()

        order_data = response.json()
        payment_session_id = order_data.get("payment_session_id")

        if not payment_session_id:
            return jsonify({"error": "Could not get payment session ID from Cashfree"}), 500

        return jsonify({
            "success": True,
            "payment_session_id": payment_session_id
        })

    except requests.exceptions.HTTPError as err:
        print(f"Cashfree API Error: {err.response.text}")
        return jsonify({"error": "Failed to create payment order", "details": err.response.json()}), err.response.status_code
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/payment/status', methods=['GET'])
def payment_status():
    order_id = request.args.get('order_id')
    return jsonify({
        'message': 'Payment status check page',
        'order_id': order_id
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


#commit testing