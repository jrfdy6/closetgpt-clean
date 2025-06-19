import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./index";
import type { UserProfile } from "@shared/types";
import { UserProfileSchema } from "@shared/types";

// Collection reference
const USERS_COLLECTION = "users";

// Helper function to convert timestamp to number
function convertTimestamp(timestamp: any): number {
  if (timestamp instanceof Timestamp) {
    return timestamp.toMillis();
  }
  if (typeof timestamp === 'number') {
    return timestamp;
  }
  return Date.now();
}

// Create initial user profile
export async function createInitialUserProfile(
  userId: string,
  email: string,
  displayName: string | null
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const now = Timestamp.now();
  
  const initialProfile = {
    id: userId,
    name: displayName || email.split('@')[0],
    email: email,
    gender: null,
    preferences: {
      style: [],
      colors: [],
      occasions: []
    },
    measurements: {
      height: 0,
      weight: 0,
      bodyType: null,
      skinTone: null
    },
    stylePreferences: [],
    bodyType: null,
    skinTone: null,
    fitPreference: null,
    sizePreference: null,
    createdAt: now,
    updatedAt: now,
    onboardingCompleted: false
  };

  await setDoc(userRef, initialProfile);
}

// Get user profile
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) return null;
  
  const rawData = userDoc.data();
  // Convert Firestore Timestamp to number for createdAt/updatedAt
  const profileData = {
    ...rawData,
    id: userId,
    createdAt: convertTimestamp(rawData.createdAt),
    updatedAt: convertTimestamp(rawData.updatedAt),
  };
  
  try {
    return UserProfileSchema.parse(profileData);
  } catch (error) {
    console.error("Error validating user profile:", error);
    return null;
  }
}

// Create or update user profile
export async function setUserProfile(
  userId: string,
  profile: Partial<UserProfile>
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await setDoc(
    userRef,
    {
      ...profile,
      updatedAt: Timestamp.now(),
    },
    { merge: true }
  );
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

// Update user preferences
export async function updateUserPreferences(
  userId: string,
  preferences: Partial<UserProfile["preferences"]>
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userRef, {
    "preferences": preferences,
    updatedAt: Timestamp.now(),
  });
}

// Update user measurements
export async function updateUserMeasurements(
  userId: string,
  measurements: Partial<UserProfile["measurements"]>
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userRef, {
    "measurements": measurements,
    updatedAt: Timestamp.now(),
  });
}

// Update user style preferences
export async function updateUserStylePreferences(
  userId: string,
  stylePreferences: Partial<UserProfile["stylePreferences"]>
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userRef, {
    "stylePreferences": stylePreferences,
    updatedAt: Timestamp.now(),
  });
} 