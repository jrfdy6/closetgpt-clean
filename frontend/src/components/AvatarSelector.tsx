"use client";

import { useState } from "react";
import Image from "next/image";
import { useStorage } from "@/lib/hooks/useStorage";
import { generateAvatarUrl, HAIR_STYLES, HAIR_COLORS } from "@/lib/utils/avatar";

interface AvatarSelectorProps {
  currentAvatar: string | null;
  onAvatarChange: (url: string) => void;
}

type SkinTone = "light" | "medium-light" | "medium" | "medium-dark" | "dark" | "deep";

// Skin tone options with their corresponding color codes
const SKIN_TONES: { id: string; label: string; value: SkinTone; color: string }[] = [
  { id: "tone1", label: "Light", value: "light", color: "#FFE0BD" },
  { id: "tone2", label: "Medium Light", value: "medium-light", color: "#E6C7A9" },
  { id: "tone3", label: "Medium", value: "medium", color: "#D4B483" },
  { id: "tone4", label: "Medium Dark", value: "medium-dark", color: "#B38B6D" },
  { id: "tone5", label: "Dark", value: "dark", color: "#8B5A2B" },
  { id: "tone6", label: "Deep", value: "deep", color: "#5C4033" },
];

const FEMALE_AVATARS = [
  { id: "female1", type: "hourglass", label: "Hourglass" },
  { id: "female2", type: "pear", label: "Pear" },
  { id: "female3", type: "apple", label: "Apple" },
  { id: "female4", type: "rectangle", label: "Rectangle" },
  { id: "female5", type: "inverted-triangle", label: "Inverted Triangle" },
  { id: "female6", type: "petite", label: "Petite" },
  { id: "female7", type: "tall", label: "Tall" },
  { id: "female8", type: "plus-curvy", label: "Plus Size Curvy" },
  { id: "female9", type: "lean-column", label: "Lean Column" },
];

const MALE_AVATARS = [
  { id: "male1", type: "rectangle", label: "Rectangle" },
  { id: "male2", type: "triangle", label: "Triangle" },
  { id: "male3", type: "inverted-triangle", label: "Inverted Triangle" },
  { id: "male4", type: "oval", label: "Oval" },
  { id: "male5", type: "trapezoid", label: "Trapezoid" },
  { id: "male6", type: "slim", label: "Slim" },
  { id: "male7", type: "stocky", label: "Stocky" },
  { id: "male8", type: "tall", label: "Tall" },
  { id: "male9", type: "short", label: "Short" },
];

export default function AvatarSelector({ currentAvatar, onAvatarChange }: AvatarSelectorProps) {
  const [selectedGender, setSelectedGender] = useState<"female" | "male">("female");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTone, setSelectedTone] = useState<SkinTone>("light");
  const [selectedHairStyle, setSelectedHairStyle] = useState<string>(
    HAIR_STYLES.female[0].value
  );
  const [selectedHairColor, setSelectedHairColor] = useState<string>(
    HAIR_COLORS[1].value
  );
  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { uploadFile, uploading, error } = useStorage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const path = `avatars/${selectedGender}/${selectedTone}/${Date.now()}_${file.name}`;
      const downloadURL = await uploadFile(file, path);
      onAvatarChange(downloadURL);
      setFile(null);
      setPreview("");
    } catch (err) {
      console.error("Error uploading avatar:", err);
    }
  };

  const currentAvatars = selectedGender === "female" ? FEMALE_AVATARS : MALE_AVATARS;
  const filteredAvatars = selectedType === "all"
    ? currentAvatars
    : currentAvatars.filter(avatar => avatar.type === selectedType);

  const bodyTypeOptions = selectedGender === "female"
    ? [
        { value: "all", label: "All Body Types" },
        { value: "hourglass", label: "Hourglass" },
        { value: "pear", label: "Pear" },
        { value: "apple", label: "Apple" },
        { value: "rectangle", label: "Rectangle" },
        { value: "inverted-triangle", label: "Inverted Triangle" },
        { value: "petite", label: "Petite" },
        { value: "tall", label: "Tall" },
        { value: "plus-curvy", label: "Plus Size Curvy" },
        { value: "lean-column", label: "Lean Column" },
      ]
    : [
        { value: "all", label: "All Body Types" },
        { value: "rectangle", label: "Rectangle" },
        { value: "triangle", label: "Triangle" },
        { value: "inverted-triangle", label: "Inverted Triangle" },
        { value: "oval", label: "Oval" },
        { value: "trapezoid", label: "Trapezoid" },
        { value: "slim", label: "Slim" },
        { value: "stocky", label: "Stocky" },
        { value: "tall", label: "Tall" },
        { value: "short", label: "Short" },
      ];

  const getAvatarUrl = (avatar: typeof FEMALE_AVATARS[0]) => {
    return generateAvatarUrl({
      gender: selectedGender,
      bodyType: avatar.type,
      skinTone: selectedTone,
      hairStyle: selectedHairStyle,
      hairColor: selectedHairColor,
    });
  };

  // Update hair style when gender changes
  const handleGenderChange = (gender: "female" | "male") => {
    setSelectedGender(gender);
    setSelectedHairStyle(HAIR_STYLES[gender][0].value);
  };

  const handleAvatarSelect = (avatar: typeof FEMALE_AVATARS[0]) => {
    const url = getAvatarUrl(avatar);
    onAvatarChange(url);
    setShowPreview(true);
  };

  return (
    <div>
      {showPreview && currentAvatar && (
        <div onClick={() => setShowPreview(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Image
              src={currentAvatar}
              alt="Selected Avatar"
              fill
              sizes="(max-width: 768px) 100vw, 16rem"
            />
            <button onClick={() => setShowPreview(false)}>
              ×
            </button>
          </div>
        </div>
      )}

      <div>
        <div>
          <button
            onClick={() => handleGenderChange("female")}
          >
            Female
          </button>
          <button
            onClick={() => handleGenderChange("male")}
          >
            Male
          </button>
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {bodyTypeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Skin Tone</label>
        <div>
          {SKIN_TONES.map((tone) => (
            <button
              key={tone.id}
              onClick={() => setSelectedTone(tone.value)}
              style={{ backgroundColor: tone.color }}
              title={tone.label}
            />
          ))}
        </div>
      </div>

      <div>
        <label>Hair Style</label>
        <select
          value={selectedHairStyle}
          onChange={(e) => setSelectedHairStyle(e.target.value)}
        >
          {HAIR_STYLES[selectedGender].map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Hair Color</label>
        <select
          value={selectedHairColor}
          onChange={(e) => setSelectedHairColor(e.target.value)}
        >
          {HAIR_COLORS.map((color) => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Upload Custom Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {preview && (
          <div>
            <img src={preview} alt="Preview" />
            <button onClick={handleUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}
      </div>

      <div>
        {filteredAvatars.map((avatar) => (
          <div key={avatar.id} onClick={() => handleAvatarSelect(avatar)}>
            <img
              src={getAvatarUrl(avatar)}
              alt={avatar.label}
            />
            <p>{avatar.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 