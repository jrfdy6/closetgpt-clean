'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import { Toaster } from './ui/toaster';
import { FirebaseProvider } from '@/lib/firebase-context';
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    console.log('Providers component mounted');
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <FirebaseProvider>
        <Navigation />
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <Toaster />
      </FirebaseProvider>
    </ThemeProvider>
  );
} 