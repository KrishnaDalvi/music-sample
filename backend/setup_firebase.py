#!/usr/bin/env python3
"""
Firebase Setup Helper Script

This script helps you set up Firebase for the backend.
"""

import os
import json

def main():
    print("🔥 Firebase Setup Helper")
    print("=" * 40)
    
    # Check if service account file exists
    if os.path.exists("firebase-service-account.json"):
        print("✅ Firebase service account file found!")
        print("You can now run the backend with: python app.py")
        return
    
    print("❌ Firebase service account file not found.")
    print("\n📋 Setup Instructions:")
    print("1. Go to Firebase Console (https://console.firebase.google.com)")
    print("2. Select your project")
    print("3. Go to Project Settings (gear icon)")
    print("4. Click on 'Service accounts' tab")
    print("5. Click 'Generate new private key'")
    print("6. Download the JSON file")
    print("7. Rename it to 'firebase-service-account.json'")
    print("8. Place it in the backend/ directory")
    print("\nAfter completing these steps, run this script again.")
    
    # Create a sample structure
    sample_structure = {
        "type": "service_account",
        "project_id": "your-project-id",
        "private_key_id": "your-private-key-id",
        "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
        "client_id": "your-client-id",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com"
    }
    
    print(f"\n📄 Expected file structure:")
    print(json.dumps(sample_structure, indent=2))

if __name__ == "__main__":
    main() 