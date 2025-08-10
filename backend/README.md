# Flask Backend with Firebase Authentication

This is a Flask backend that handles user authentication using Firebase.

## Setup Instructions

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Firebase Setup:**
   - Go to Firebase Console
   - Create a new project or use existing one
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file and rename it to `firebase-service-account.json`
   - Place it in the `backend/` directory

3. **Run the backend:**
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

## API Endpoints

- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `GET /api/user/<uid>` - Get user data
- `GET /api/health` - Health check

## Environment Variables

Create a `.env` file in the backend directory if needed for additional configuration. 