import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { UserProfile } from "@/lib/utils/outfitGenerator";

// Collection reference
const USERS_COLLECTION = "users";

// Get user profile
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) return null;
  return userDoc.data() as UserProfile;
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