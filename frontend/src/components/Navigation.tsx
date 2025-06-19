"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useFirebase } from "@/lib/firebase-context";

export default function Navigation() {
  const router = useRouter();
  const { user } = useFirebase();

  const handleSignOut = async () => {
    if (!auth) {
      console.error("Firebase Auth is not initialized");
      return;
    }
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center text-xl font-bold">
              ClosetGPT
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/wardrobe" className="text-gray-700 hover:text-gray-900">
                  Wardrobe
                </Link>
                <Link href="/outfits" className="text-gray-700 hover:text-gray-900">
                  Outfits
                </Link>
                <Link href="/style-rules" className="text-gray-700 hover:text-gray-900">
                  Style Rules
                </Link>
                <Link href="/upload" className="text-gray-700 hover:text-gray-900">
                  Upload
                </Link>
                <Link href="/profile" className="text-gray-700 hover:text-gray-900">
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 