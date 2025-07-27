"use client";

import { useEffect, useState } from "react";
import { auth, debugAuth } from "@/lib/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function TestFirebasePage() {
  const [status, setStatus] = useState<string>("Loading...");
  const [testEmail, setTestEmail] = useState("test@example.com");
  const [testPassword, setTestPassword] = useState("password123");

  useEffect(() => {
    console.log("🔍 Test Firebase Page - Auth object:", auth);
    debugAuth();
    
    if (!auth) {
      setStatus("❌ Firebase Auth is not initialized");
    } else {
      setStatus("✅ Firebase Auth is initialized");
    }
  }, []);

  const handleTestSignIn = async () => {
    if (!auth) {
      setStatus("❌ Cannot test sign-in - Auth not initialized");
      return;
    }

    try {
      setStatus("🔄 Testing sign-in...");
      const result = await signInWithEmailAndPassword(auth, testEmail, testPassword);
      setStatus(`✅ Sign-in successful! User ID: ${result.user.uid}`);
    } catch (error) {
      setStatus(`❌ Sign-in failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Firebase Test Page</h1>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="font-semibold mb-2">Status:</h2>
        <p>{status}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Test Sign-In:</h2>
        <div className="space-y-2">
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Test email"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
            placeholder="Test password"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleTestSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Test Sign-In
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Environment Variables Check:</h2>
        <div className="text-sm space-y-1">
          <p>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✅ Set" : "❌ Missing"}</p>
          <p>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "✅ Set" : "❌ Missing"}</p>
          <p>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "✅ Set" : "❌ Missing"}</p>
        </div>
      </div>
    </div>
  );
} 