"use client";

import { useState } from "react";
import { useFirebase } from "@/lib/firebase-context";
import ProtectedRoute from "@/components/ProtectedRoute";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AvatarSelector from "@/components/AvatarSelector";
import { useUserProfile } from "@/hooks/useUserProfile";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useFirebase();
  const {
    profile,
    isLoading,
    error: profileError,
    updateProfile: updateUserProfile,
    updatePreferences,
    updateMeasurements,
    updateStylePreferences,
  } = useUserProfile();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.photoURL || null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  // Form states
  const [bodyType, setBodyType] = useState(profile?.bodyType || "");
  const [skinTone, setSkinTone] = useState(profile?.skinTone || "");
  const [fitPreference, setFitPreference] = useState(profile?.fitPreference || "");
  const [stylePreferences, setStylePreferences] = useState<string[]>(profile?.stylePreferences || []);
  const [colorPreferences, setColorPreferences] = useState<string[]>(profile?.preferences?.colorPreferences || []);
  const [patternPreferences, setPatternPreferences] = useState<string[]>(profile?.preferences?.patternPreferences || []);
  const [fabricPreferences, setFabricPreferences] = useState<string[]>(profile?.preferences?.fabricPreferences || []);
  const [brandPreferences, setBrandPreferences] = useState<string[]>(profile?.preferences?.brandPreferences || []);
  const [priceRange, setPriceRange] = useState<"Budget" | "Mid-Range" | "Luxury">(
    profile?.preferences?.priceRange || "Mid-Range"
  );
  const [sustainability, setSustainability] = useState(profile?.preferences?.sustainability || false);
  const [measurements, setMeasurements] = useState(profile?.measurements || {
    height: 0,
    weight: 0,
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      // Update Firebase auth profile
      await updateProfile(user, {
        displayName,
        photoURL: avatarUrl,
      });

      // Update user profile in Firestore
      await updateUserProfile({
        bodyType,
        skinTone,
        fitPreference,
        stylePreferences,
        preferences: {
          colorPreferences,
          patternPreferences,
          fabricPreferences,
          brandPreferences,
          priceRange,
          sustainability,
        },
        measurements,
      });

      setIsEditing(false);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (url: string) => {
    setAvatarUrl(url);
  };

  if (isLoading) {
    return (
      <div>
        <div>
          <div>Loading...</div>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div>
        <div>
          <h1>Profile</h1>

          <div>
            <div>
              <div>
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="Profile"
                    fill
                  />
                ) : (
                  <div>
                    <span>
                      {user?.displayName?.[0] || user?.email?.[0] || "?"}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h2>
                  {user?.displayName || "Anonymous User"}
                </h2>
                <p>{user?.email}</p>
              </div>
            </div>

            {(error || profileError) && (
              <div>
                {error || profileError}
              </div>
            )}

            <div>
              <div>
                <button onClick={() => setActiveTab("basic")}>Basic Info</button>
                <button onClick={() => setActiveTab("preferences")}>Preferences</button>
                <button onClick={() => setActiveTab("measurements")}>Measurements</button>
              </div>

              {activeTab === "basic" && (
                <div>
                  <div>
                    <label htmlFor="displayName">Display Name</label>
                    <input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your display name"
                    />
                  </div>

                  <div>
                    <label>Profile Picture</label>
                    <AvatarSelector
                      currentAvatar={avatarUrl}
                      onAvatarChange={handleAvatarChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="bodyType">Body Type</label>
                    <select
                      id="bodyType"
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value)}
                    >
                      <option value="">Select body type</option>
                      <option value="athletic">Athletic</option>
                      <option value="hourglass">Hourglass</option>
                      <option value="pear">Pear</option>
                      <option value="apple">Apple</option>
                      <option value="rectangle">Rectangle</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="skinTone">Skin Tone</label>
                    <select
                      id="skinTone"
                      value={skinTone}
                      onChange={(e) => setSkinTone(e.target.value)}
                    >
                      <option value="">Select skin tone</option>
                      <option value="light">Light</option>
                      <option value="medium-light">Medium Light</option>
                      <option value="medium">Medium</option>
                      <option value="medium-dark">Medium Dark</option>
                      <option value="dark">Dark</option>
                      <option value="deep">Deep</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="fitPreference">Fit Preference</label>
                    <select
                      id="fitPreference"
                      value={fitPreference}
                      onChange={(e) => setFitPreference(e.target.value)}
                    >
                      <option value="">Select fit preference</option>
                      <option value="fitted">Fitted</option>
                      <option value="relaxed">Relaxed</option>
                      <option value="oversized">Oversized</option>
                      <option value="loose">Loose</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div>
                  <div>
                    <label htmlFor="stylePreferences">Style Preferences</label>
                    <select
                      id="stylePreferences"
                      value={stylePreferences[0]}
                      onChange={(e) => setStylePreferences([e.target.value])}
                    >
                      <option value="">Select style preferences</option>
                      <option value="streetwear">Streetwear</option>
                      <option value="minimal">Minimal</option>
                      <option value="athletic">Athletic</option>
                      <option value="formal">Formal</option>
                      <option value="casual">Casual</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="priceRange">Price Range</label>
                    <select
                      id="priceRange"
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value as "Budget" | "Mid-Range" | "Luxury")}
                    >
                      <option value="Budget">Budget</option>
                      <option value="Mid-Range">Mid-Range</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>

                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={sustainability}
                        onChange={(e) => setSustainability(e.target.checked)}
                      />
                      Sustainability Focus
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "measurements" && (
                <div>
                  <div>
                    <label htmlFor="height">Height (cm)</label>
                    <input
                      id="height"
                      type="number"
                      value={measurements.height}
                      onChange={(e) => setMeasurements({ ...measurements, height: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                      id="weight"
                      type="number"
                      value={measurements.weight}
                      onChange={(e) => setMeasurements({ ...measurements, weight: Number(e.target.value) })}
                    />
                  </div>
                </div>
              )}

              <div>
                <button onClick={handleUpdateProfile} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 