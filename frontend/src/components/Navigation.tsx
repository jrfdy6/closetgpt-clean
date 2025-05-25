"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useFirebase } from "@/lib/firebase-context";

export default function Navigation() {
  const router = useRouter();
  const { user } = useFirebase();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav>
      <div>
        <Link href="/">
          ClosetGPT
        </Link>

        <div>
          {user ? (
            <>
              <Link href="/wardrobe">
                Wardrobe
              </Link>
              <Link href="/outfits">
                Outfits
              </Link>
              <Link href="/upload">
                Upload
              </Link>
              <Link href="/profile">
                Profile
              </Link>
              <button onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <button>Sign In</button>
              </Link>
              <Link href="/signup">
                <button>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 