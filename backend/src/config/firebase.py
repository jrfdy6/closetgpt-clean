import firebase_admin
from firebase_admin import credentials, firestore
import os
from pathlib import Path

# Get the absolute path to the backend directory
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent

# Check for environment variable first, then fall back to hardcoded path
CREDENTIALS_PATH = os.getenv('GOOGLE_APPLICATION_CREDENTIALS') or str(BACKEND_DIR / 'service-account-key.json')

# Initialize Firebase Admin
if not firebase_admin._apps:
    try:
        if os.path.exists(CREDENTIALS_PATH):
            cred = credentials.Certificate(CREDENTIALS_PATH)
            firebase_admin.initialize_app(cred)
            print(f"✅ Firebase initialized with credentials from: {CREDENTIALS_PATH}")
        else:
            # For development, you can use application default credentials
            firebase_admin.initialize_app() 
            print("⚠️  Firebase initialized with application default credentials")
    except Exception as e:
        print(f"❌ Error initializing Firebase with service account: {e}")
        print("🔄 Trying with application default credentials...")
        try:
            firebase_admin.initialize_app()
            print("✅ Firebase initialized with application default credentials")
        except Exception as e2:
            print(f"❌ Failed to initialize Firebase: {e2}")
            raise e2

# Initialize Firestore
db = firestore.client() 