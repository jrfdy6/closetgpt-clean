import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from "../firebase";
import { analyzeClothingImage } from '../services/clothingImageAnalysis';
import {
  ClothingItem,
  ClothingItemSchema,
  OpenAIClothingAnalysis,
  ApiResponse
} from '@shared/types';
import {
  validateClothingItem,
  validateOpenAIAnalysis,
  convertOpenAIAnalysisToClothingItem,
  createSuccessResponse,
  createErrorResponse
} from '@shared/utils';
import { FIREBASE_COLLECTIONS, STORAGE_PATHS } from '@shared/constants';
import { uploadMultipleImages, deleteMultipleImages, UploadedImage } from "./storageService";
import { createHash } from 'crypto';

// Collection reference
const WARDROBE_COLLECTION = "wardrobe";

interface DuplicateCheckResult {
  uniqueImages: File[];
  duplicateHashes: string[];
  similarImages: Array<{
    file: File;
    hash: string;
    similarity: number;
    existingItem: ClothingItem;
  }>;
}

// Calculate SHA-256 hash of a file
const calculateFileHash = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const hash = createHash('sha256').update(Buffer.from(buffer)).digest('hex');
        resolve(hash);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

// Calculate image similarity using perceptual hash
const calculateImageSimilarity = async (file1: File, file2Url: string): Promise<number> => {
  try {
    // Fetch the second image from URL
    const response = await fetch(file2Url);
    const blob = await response.blob();
    const file2 = new File([blob], 'existing-image', { type: blob.type });

    // Calculate hashes
    const hash1 = await calculateFileHash(file1);
    const hash2 = await calculateFileHash(file2);
    
    // Calculate Hamming distance between hashes
    let distance = 0;
    for (let i = 0; i < hash1.length; i++) {
      if (hash1[i] !== hash2[i]) distance++;
    }
    
    // Convert to similarity score (0-1)
    return 1 - (distance / hash1.length);
  } catch (error) {
    console.error('Error calculating image similarity:', error);
    return 0; // Return 0 similarity on error
  }
};

// Check for duplicate images using hash comparison and similarity
const checkForDuplicateImages = async (
  userId: string, 
  images: File[], 
  options: { 
    forceUpload?: boolean;
    similarityThreshold?: number;
  } = {}
): Promise<DuplicateCheckResult> => {
  try {
    const { forceUpload = false, similarityThreshold = 0.95 } = options;
    
    // Get all existing wardrobe items for the user
    const existingItems = await getWardrobeItems(userId);
    if (!existingItems.success || !existingItems.data) {
      return { uniqueImages: images, duplicateHashes: [], similarImages: [] };
    }

    // Create a Set of existing image hashes
    const existingHashes = new Set(existingItems.data.map(item => item.metadata?.imageHash));

    // Calculate hashes for new images
    const imageHashes = await Promise.all(
      images.map(async (file) => ({
        file,
        hash: await calculateFileHash(file)
      }))
    );

    // Filter out duplicates and find similar images
    const uniqueImages: File[] = [];
    const duplicateHashes: string[] = [];
    const similarImages: DuplicateCheckResult['similarImages'] = [];

    for (const { file, hash } of imageHashes) {
      if (existingHashes.has(hash)) {
        if (forceUpload) {
          uniqueImages.push(file);
        } else {
          duplicateHashes.push(hash);
        }
      } else {
        // Check for similar images
        const similarities = await Promise.all(
          existingItems.data.map(async (item) => {
            if (!item.metadata?.imageHash) return null;
            const similarity = await calculateImageSimilarity(file, item.imageUrl);
            return {
              file,
              hash,
              similarity,
              existingItem: item
            };
          })
        );

        const similarImage = similarities
          .filter((s): s is NonNullable<typeof s> => s !== null)
          .find(s => s.similarity >= similarityThreshold);

        if (similarImage) {
          similarImages.push(similarImage);
        } else {
          uniqueImages.push(file);
        }
      }
    }

    return { uniqueImages, duplicateHashes, similarImages };
  } catch (error) {
    console.error("Error checking for duplicates:", error);
    return { uniqueImages: images, duplicateHashes: [], similarImages: [] };
  }
};

// Get wardrobe items
export async function getWardrobeItems(userId: string): Promise<ApiResponse<ClothingItem[]>> {
  try {
    const wardrobeRef = collection(db, WARDROBE_COLLECTION);
    const q = query(wardrobeRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const items: ClothingItem[] = [];
    snapshot.forEach(docSnap => {
      try {
        items.push(validateClothingItem({ ...docSnap.data(), id: docSnap.id }));
      } catch (e) {
        console.warn("Skipping invalid item:", docSnap.id, e);
      }
    });
    return createSuccessResponse(items);
  } catch (error) {
    console.error("Error fetching wardrobe items:", error);
    return createErrorResponse('Failed to fetch wardrobe items');
  }
}

// Get wardrobe item by ID
export async function getWardrobeItem(itemId: string): Promise<ApiResponse<ClothingItem | null>> {
  try {
    const docRef = doc(db, WARDROBE_COLLECTION, itemId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return createSuccessResponse(null);
    return createSuccessResponse(validateClothingItem({ ...docSnap.data(), id: docSnap.id }));
  } catch (error) {
    return createErrorResponse('Failed to fetch wardrobe item');
  }
}

// Add new wardrobe item
export async function addWardrobeItem(item: Omit<ClothingItem, 'id'>): Promise<ApiResponse<ClothingItem>> {
  try {
    const valid = validateClothingItem(item);
    const docRef = await addDoc(collection(db, WARDROBE_COLLECTION), valid);
    return createSuccessResponse({ ...valid, id: docRef.id });
  } catch (error) {
    return createErrorResponse('Failed to add wardrobe item');
  }
}

// Add multiple wardrobe items
export const addMultipleWardrobeItems = async (
  userId: string,
  items: Array<Omit<ClothingItem, 'id' | 'userId'>>
): Promise<ApiResponse<ClothingItem[]>> => {
  try {
    const batch = writeBatch(db);
    const validatedItems = items.map(item => validateClothingItem({ ...item, userId }));
    
    const newItems: ClothingItem[] = [];
    for (const item of validatedItems) {
      const docRef = doc(collection(db, WARDROBE_COLLECTION));
      batch.set(docRef, item);
      newItems.push({ ...item, id: docRef.id });
    }
    
    await batch.commit();
    return createSuccessResponse(newItems);
  } catch (error) {
    return createErrorResponse(error instanceof Error ? error.message : 'Failed to add items');
  }
};

// Update wardrobe item
export async function updateWardrobeItem(itemId: string, updates: Partial<ClothingItem>): Promise<ApiResponse<ClothingItem>> {
  try {
    const docRef = doc(db, WARDROBE_COLLECTION, itemId);
    await updateDoc(docRef, updates);
    const updatedSnap = await getDoc(docRef);
    return createSuccessResponse(validateClothingItem({ ...updatedSnap.data(), id: updatedSnap.id }));
  } catch (error) {
    return createErrorResponse('Failed to update wardrobe item');
  }
}

// Delete wardrobe item
export async function deleteWardrobeItem(itemId: string): Promise<ApiResponse<null>> {
  try {
    const docRef = doc(db, WARDROBE_COLLECTION, itemId);
    await deleteDoc(docRef);
    return createSuccessResponse(null);
  } catch (error) {
    return createErrorResponse('Failed to delete wardrobe item');
  }
}

// Delete multiple wardrobe items
export const deleteMultipleWardrobeItems = async (
  userId: string,
  itemIds: string[]
): Promise<ApiResponse<void>> => {
  try {
    const batch = writeBatch(db);
    itemIds.forEach(itemId => {
      const itemRef = doc(db, WARDROBE_COLLECTION, itemId);
      batch.delete(itemRef);
    });
    await batch.commit();
    return createSuccessResponse(undefined);
  } catch (error) {
    return createErrorResponse(error instanceof Error ? error.message : 'Failed to delete items');
  }
};

// Get wardrobe items by category
export async function getWardrobeItemsByCategory(
  userId: string,
  category: string
): Promise<ClothingItem[]> {
  const wardrobeRef = collection(db, WARDROBE_COLLECTION);
  const q = query(
    wardrobeRef,
    where("userId", "==", userId),
    where("type", "==", category),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return validateClothingItem({
      id: doc.id,
      userId,
      type: data.type,
      subType: data.subType,
      dominantColors: data.dominantColors || [],
      matchingColors: data.matchingColors || [],
      style: data.style || [],
      brand: data.brand,
      season: data.season || [],
      occasion: data.occasion || [],
      imageUrl: data.imageUrl,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      metadata: data.metadata || {}
    });
  });
}

// Get wardrobe items by season
export async function getWardrobeItemsBySeason(
  userId: string,
  season: string
): Promise<ClothingItem[]> {
  const wardrobeRef = collection(db, WARDROBE_COLLECTION);
  const q = query(
    wardrobeRef,
    where("userId", "==", userId),
    where("season", "array-contains", season),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return validateClothingItem({
      id: doc.id,
      userId,
      type: data.type,
      subType: data.subType,
      dominantColors: data.dominantColors || [],
      matchingColors: data.matchingColors || [],
      style: data.style || [],
      brand: data.brand,
      season: data.season || [],
      occasion: data.occasion || [],
      imageUrl: data.imageUrl,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      metadata: data.metadata || {}
    });
  });
}

// Process and add multiple images
export const processAndAddImages = async (
  userId: string,
  images: File[],
  options: {
    forceUpload?: boolean;
    similarityThreshold?: number;
  } = {}
): Promise<ApiResponse<{
  newItems: ClothingItem[];
  duplicates: string[];
  similarImages: Array<{
    file: File;
    existingItem: ClothingItem;
    similarity: number;
  }>;
}>> => {
  try {
    // Check for duplicates first using hash comparison
    const { uniqueImages, duplicateHashes, similarImages } = await checkForDuplicateImages(
      userId, 
      images,
      options
    );
    
    if (uniqueImages.length === 0) {
      return createErrorResponse('All selected images are duplicates or too similar to existing items');
    }

    // Upload all images in parallel
    const uploadedImages = await uploadMultipleImages(uniqueImages, userId);
    
    // Calculate hashes for the unique images
    const imageHashes = await Promise.all(
      uniqueImages.map(file => calculateFileHash(file))
    );
    
    // Process each image analysis in parallel
    const analysisPromises = uploadedImages.map(img => analyzeClothingImage(img.url));
    const analyses = await Promise.all(analysisPromises);
    
    // Validate all analyses
    const validatedAnalyses = analyses.map(analysis => validateOpenAIAnalysis(analysis));
    
    // Convert analyses to clothing items with image hashes
    const items = validatedAnalyses.map((analysis, index) => ({
      ...convertOpenAIAnalysisToClothingItem(analysis, userId, uploadedImages[index].url),
      metadata: {
        imageHash: imageHashes[index]
      }
    }));
    
    // Validate all items
    const validatedItems = items.map(item => validateClothingItem(item));
    
    // Use batch write for all items
    const batch = writeBatch(db);
    const newItems: ClothingItem[] = [];
    
    for (const item of validatedItems) {
      const docRef = doc(collection(db, WARDROBE_COLLECTION));
      batch.set(docRef, item);
      newItems.push({ ...item, id: docRef.id });
    }
    
    await batch.commit();
    return createSuccessResponse({
      newItems,
      duplicates: duplicateHashes,
      similarImages: similarImages.map(({ file, existingItem, similarity }) => ({
        file,
        existingItem,
        similarity
      }))
    });
  } catch (error) {
    // If there's an error, attempt to clean up any uploaded images
    if (error instanceof Error && 'uploadedImages' in error) {
      const uploadedImages = (error as any).uploadedImages as UploadedImage[];
      await deleteMultipleImages(uploadedImages.map(img => img.path));
    }
    return createErrorResponse(error instanceof Error ? error.message : 'Failed to process images');
  }
}; 