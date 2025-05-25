"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Add to Wardrobe</h1>
        <UploadForm />
      </div>
    </ProtectedRoute>
  );
} 