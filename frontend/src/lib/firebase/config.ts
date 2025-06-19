import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only on the client side
const app = typeof window !== 'undefined' ? (!getApps().length ? initializeApp(firebaseConfig) : getApp()) : undefined;
const db = typeof window !== 'undefined' && app ? getFirestore(app) : undefined;
const storage = typeof window !== 'undefined' && app ? getStorage(app) : undefined;
const auth = typeof window !== 'undefined' && app ? getAuth(app) : undefined;

export { app, db, storage, auth }; 