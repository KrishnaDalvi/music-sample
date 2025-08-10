# Complete Setup Guide

This guide will help you set up the full-stack application with Flask backend and React frontend, integrated with Firebase authentication.

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Set up Firebase (see Firebase Setup section below)
python setup_firebase.py

# Run the backend
python app.py
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to project root
cd ..

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔥 Firebase Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or select existing project
3. Follow the setup wizard

### Step 2: Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider

### Step 3: Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to you

### Step 4: Get Service Account Key
1. In Firebase Console, go to Project Settings (gear icon)
2. Click "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Rename it to `firebase-service-account.json`
6. Place it in the `backend/` directory

### Step 5: Verify Setup
```bash
cd backend
python setup_firebase.py
```

## 🧪 Testing the Application

### 1. Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### 2. Test User Registration
```bash
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### 3. Test User Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🎯 Features

### Backend Features
- ✅ User registration with Firebase Auth
- ✅ User login with Firebase Auth
- ✅ User data storage in Firestore
- ✅ Custom token generation
- ✅ Error handling and validation
- ✅ CORS enabled for frontend integration

### Frontend Features
- ✅ Beautiful login page with glassmorphism design
- ✅ User registration page with form validation
- ✅ Real-time API integration
- ✅ User data display in navbar
- ✅ Responsive design for all devices
- ✅ Smooth animations and transitions

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/signup` | Register new user |
| POST | `/api/login` | Login existing user |
| GET | `/api/user/<uid>` | Get user data |
| GET | `/api/health` | Health check |

## 📁 Project Structure

```
musicsamplepackweb/
├── backend/
│   ├── app.py                    # Flask backend
│   ├── requirements.txt          # Python dependencies
│   ├── setup_firebase.py        # Firebase setup helper
│   ├── README.md                # Backend documentation
│   └── firebase-service-account.json  # Firebase credentials
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx        # Login page
│   │   └── SignupPage.jsx       # Signup page
│   ├── services/
│   │   └── api.js               # API service
│   └── components/
│       ├── UserInfo.jsx         # User info component
│       └── Navbar.jsx           # Navigation bar
└── SETUP.md                     # This setup guide
```

## 🐛 Troubleshooting

### Backend Issues
- **Import Error**: Make sure you've installed requirements: `pip install -r requirements.txt`
- **Firebase Error**: Verify `firebase-service-account.json` is in the backend directory
- **Port Already in Use**: Change port in `app.py` or kill existing process

### Frontend Issues
- **API Connection Error**: Ensure backend is running on `http://localhost:5000`
- **CORS Error**: Backend has CORS enabled, restart if needed
- **Build Errors**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Firebase Issues
- **Authentication Error**: Enable Email/Password in Firebase Console
- **Database Error**: Create Firestore database in test mode
- **Service Account Error**: Regenerate service account key

## 🔒 Security Notes

- Keep `firebase-service-account.json` secure and never commit to version control
- Use environment variables for production deployment
- Enable proper Firebase security rules for production
- Consider implementing rate limiting for production

## 🚀 Production Deployment

For production deployment:
1. Set up proper Firebase security rules
2. Use environment variables for sensitive data
3. Deploy backend to a cloud service (Heroku, AWS, etc.)
4. Deploy frontend to a static hosting service (Vercel, Netlify, etc.)
5. Update API_BASE_URL in `src/services/api.js` to production URL 