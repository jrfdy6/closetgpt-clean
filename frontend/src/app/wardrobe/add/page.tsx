"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { useWardrobe } from "@/hooks/useWardrobe";
import type { ClothingItem } from "@/lib/utils/outfitGenerator";

// Constants
const CLOTHING_TYPES = [
  "shirt",
  "pants",
  "dress",
  "skirt",
  "jacket",
  "sweater",
  "shoes",
  "accessory",
  "other",
] as const;

const SEASONS = ["Spring", "Summer", "Fall", "Winter"];

const COLORS = [
  "Black",
  "White",
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Pink",
  "Brown",
  "Beige",
  "Orange",
];

export default function AddItemPage() {
  const router = useRouter();
  const { addItem } = useWardrobe();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [name, setName] = useState("");
  const [type, setType] = useState<ClothingItem["type"]>("shirt");
  const [color, setColor] = useState(COLORS[0]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSeasonToggle = (season: string) => {
    setSelectedSeasons((prev) =>
      prev.includes(season)
        ? prev.filter((s) => s !== season)
        : [...prev, season]
    );
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // TODO: Upload image to storage and get URL
      const imageUrl = preview; // Replace with actual upload

      const newItem: Omit<ClothingItem, "id"> = {
        name,
        type,
        color,
        season: selectedSeasons,
        imageUrl,
        tags,
        style: [],
        userId: "", // TODO: Get from auth context
        dominantColors: [],
        matchingColors: [],
        occasion: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addItem(newItem);
      router.push("/wardrobe");
    } catch (err) {
      setError("Failed to add item");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h1>Add New Item</h1>
          <p>
            Add a new item to your wardrobe
          </p>
        </div>
        <button onClick={() => router.back()}>
          <X />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div>
          <div>
            <label>Item Image</label>
            <div>
              <label htmlFor="image">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                  />
                ) : (
                  <div>
                    <Upload />
                    <p>
                      Click to upload an image
                    </p>
                  </div>
                )}
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div>
          <div>
            <div>
              <label htmlFor="name">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter item name"
                required
              />
            </div>

            <div>
              <div>
                <label htmlFor="type">
                  Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value as ClothingItem["type"])}
                  required
                >
                  {CLOTHING_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="color">
                  Color
                </label>
                <select
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                >
                  {COLORS.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label>Seasons</label>
              <div>
                {SEASONS.map((season) => (
                  <button
                    key={season}
                    type="button"
                    onClick={() => handleSeasonToggle(season)}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label>Tags</label>
              <div>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                />
                <button type="button" onClick={handleAddTag}>
                  Add Tag
                </button>
              </div>
              <div>
                {tags.map((tag) => (
                  <div key={tag}>
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}

        <div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  );
} 