import firebase_admin
from firebase_admin import credentials, firestore
import os
from pathlib import Path

# Get the absolute path to the backend directory
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
CREDENTIALS_PATH = BACKEND_DIR / 'service-account-key.json'

# Initialize Firebase Admin
if not firebase_admin._apps:
    if os.path.exists(CREDENTIALS_PATH):
        cred = credentials.Certificate(CREDENTIALS_PATH)
        firebase_admin.initialize_app(cred)
    else:
        # For development, you can use application default credentials
        firebase_admin.initialize_app() 

# Initialize Firestore
db = firestore.client() 