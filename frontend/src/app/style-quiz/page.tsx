'use client';

import React, { useState } from 'react';
import { StyleQuiz } from '@/components/StyleQuiz/StyleQuiz';
import { StyleProfile } from '@/types/style-quiz';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useFirebase } from '@/lib/firebase-context';
import ProtectedRoute from '@/components/ProtectedRoute';
import { auth } from '@/lib/firebase/config';

export default function StyleQuizPage() {
  const router = useRouter();
  const { user } = useFirebase();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuizComplete = async (styleProfile: StyleProfile) => {
    if (!user || !auth) {
      toast.error('Please sign in to save your style profile');
      router.push('/signin');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Get the current user's ID token
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) {
        throw new Error('Failed to get authentication token');
      }
      
      // Format the quiz submission data
      const quizSubmission = {
        user_id: user.uid,
        answers: Object.entries(styleProfile).map(([key, value]) => ({
          question_id: key,
          selected_option: value
        }))
      };
      
      // Save the style profile to the user's profile
      const response = await fetch('/api/style-quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(quizSubmission),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'Failed to save style profile');
      }

      toast.success('Style profile saved successfully!');
      // Redirect to the dashboard or recommendations page
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving style profile:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save style profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Discover Your Style
          </h1>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Answer a few quick questions to help us understand your style preferences
            and create personalized outfit recommendations just for you.
          </p>
          <StyleQuiz onComplete={handleQuizComplete} />
        </div>
      </div>
    </ProtectedRoute>
  );
} 