"use client";

import { useState } from "react";
import Image from "next/image";
import ImageUploadButton from "./ImageUploadButton";

export default function ProfileImage({ src, alt, size = "large", onImageUpdate }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = async (file) => {
    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const imageUrl = URL.createObjectURL(file);
      onImageUpdate(imageUrl);
    } finally {
      setIsUploading(false);
    }
  };

  const sizeClasses = {
    large: "h-32 w-32",
    medium: "h-24 w-24",
    small: "h-16 w-16"
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      <ImageUploadButton 
        onImageSelect={handleImageSelect}
        loading={isUploading}
      />
    </div>
  );
}