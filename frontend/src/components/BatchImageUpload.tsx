'use client';

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { useWardrobe } from "@/hooks/useWardrobe";
import type { ClothingItem, ApiResponse } from "@shared/types";

interface BatchImageUploadProps {
  onUploadComplete: (items: ClothingItem[]) => void;
  onError: (error: string) => void;
}

export default function BatchImageUpload({
  onUploadComplete,
  onError,
}: BatchImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const { processImages } = useWardrobe();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    
    // Create preview URLs
    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      return newPreviews.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      onError("Please select at least one image to upload");
      return;
    }

    setUploading(true);
    try {
      const response = await processImages(files);
      if (!response) {
        onError("Failed to upload images");
        return;
      }
      
      if ('success' in response && response.success && response.data) {
        const { newItems, duplicates, similarImages } = response.data;
        if (duplicates.length > 0 || similarImages.length > 0) {
          const messages = [];
          if (duplicates.length > 0) {
            messages.push(`${duplicates.length} duplicate images were skipped`);
          }
          if (similarImages.length > 0) {
            messages.push(`${similarImages.length} similar images were found`);
          }
          onError(messages.join('. '));
        }
        onUploadComplete(newItems);
      } else if ('error' in response) {
        onError(response.error || "Failed to upload images");
      } else {
        onError("Failed to upload images");
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag and drop images here, or click to select files"}
        </p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative w-full h-48">
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover rounded-lg"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          disabled={uploading || files.length === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </div>

      {uploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Processing Your Images</h3>
            <p className="text-gray-600 mb-4">Hold on tight! We're analyzing your clothing items and getting everything ready. This is about to be awesome! 🎉</p>
            <p className="text-sm text-gray-500">This may take a few moments...</p>
          </div>
        </div>
      )}
    </div>
  );
} 