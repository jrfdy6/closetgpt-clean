import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase/admin';
import { db } from '@/lib/firebase/admin';

export async function POST(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    // Verify the token
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get the request body
    const body = await request.json();
    
    // Verify that the user ID in the request matches the authenticated user
    if (body.user_id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized - User ID mismatch' },
        { status: 401 }
      );
    }

    // Prepare the profile data
    const profileData = {
      name: body.name,
      avatarUrl: body.avatarUrl,
      bodyType: body.bodyType,
      height: body.height,
      weight: body.weight,
      skinTone: body.skinTone,
      stylePreferences: body.stylePreferences || [],
      occasions: body.occasions || [],
      preferredColors: body.preferredColors || [],
      formality: body.formality || 'casual',
      fitPreference: body.fitPreference,
      sizePreference: body.sizePreference,
      seasonalPreferences: body.seasonality || ['spring', 'summer', 'fall', 'winter'],
      updatedAt: new Date().toISOString(),
    };

    // Save to Firestore in the profiles collection
    await db.collection('profiles').doc(userId).set(profileData, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    );
  }
} 