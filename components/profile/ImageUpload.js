"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ImageUpload({ currentImage, onImageUpdate, label }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
        // yaha par bhi same image upload wala logic likhna hai
      await new Promise(resolve => setTimeout(resolve, 1000));
      onImageUpdate(currentImage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-dashed border-gray-200">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={label}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <Button
            variant="outline"
            onClick={() => document.getElementById("image-upload").click()}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Change Image"}
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>
    </div>
  );
}