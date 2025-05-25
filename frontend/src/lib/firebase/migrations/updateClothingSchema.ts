import * as admin from 'firebase-admin';
import { ClothingItem } from '../../../../../shared/types';
import { validateClothingItem } from '../../../../../shared/utils';

// Initialize Firebase Admin
const serviceAccount = require('../../../../backend/service-account-key.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

interface OldClothingItem {
  id: string;
  userId: string;
  name: string;
  type: string;
  color: string;
  brand?: string;
  size?: string;
  season?: string[];
  occasion?: string[];
  imageUrl: string;
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}

export async function updateClothingSchema() {
  try {
    console.log('Starting schema update...');
    
    // Get all clothing items
    const snapshot = await db.collection('clothing').get();
    console.log(`Found ${snapshot.size} items to update`);
    
    // Update each item
    const batch = db.batch();
    let updatedCount = 0;
    
    for (const doc of snapshot.docs) {
      const oldData = doc.data() as OldClothingItem;
      
      try {
        // Create new data structure
        const newData: ClothingItem = {
          id: oldData.id,
          userId: oldData.userId,
          type: oldData.type as ClothingItem['type'],
          subType: oldData.type,
          dominantColors: [{
            name: oldData.color,
            hex: '#000000', // Default value, should be updated with actual color
            rgb: [0, 0, 0] // Default value, should be updated with actual color
          }],
          matchingColors: [],
          style: 'casual', // Default value
          brand: oldData.brand || '',
          season: (oldData.season || []).filter(s => ['spring', 'summer', 'fall', 'winter'].includes(s)) as ClothingItem['season'],
          occasion: oldData.occasion || [],
          imageUrl: oldData.imageUrl,
          createdAt: oldData.createdAt.toMillis(),
          updatedAt: oldData.updatedAt.toMillis()
        };
        
        // Validate the new data
        const validatedData = validateClothingItem(newData);
        
        // Update the document
        batch.update(doc.ref, validatedData);
        updatedCount++;
        
        // Commit batch every 500 operations
        if (updatedCount % 500 === 0) {
          await batch.commit();
          console.log(`Committed ${updatedCount} updates`);
        }
      } catch (error) {
        console.error(`Validation failed for item ${doc.id}:`, error);
        continue;
      }
    }
    
    // Commit any remaining updates
    if (updatedCount % 500 !== 0) {
      await batch.commit();
    }
    
    console.log(`Successfully updated ${updatedCount} items`);
    return true;
  } catch (error) {
    console.error('Error updating schema:', error);
    throw error;
  }
} 