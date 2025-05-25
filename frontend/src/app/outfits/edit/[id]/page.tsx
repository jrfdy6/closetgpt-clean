"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import OutfitForm from "@/components/OutfitForm";

export default function EditOutfitPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  return (
    <div className="container mx-auto py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>
      <h1 className="mb-8 text-3xl font-bold">Edit Outfit</h1>
      <OutfitForm outfitId={id} />
    </div>
  );
} 