"use client";

import { useState } from "react";
import { ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function BannerUpload({ currentBanner, onBannerUpdate }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
        // bhai yaha banner upload ya hotel upload ka logic likhna hai .............
        // matlab file upload wala logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      onBannerUpdate(currentBanner);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Hotel Banner</h2>
          <p className="text-sm text-muted-foreground">
            Upload a banner image for your hotel
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => document.getElementById("banner-upload").click()}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload New Banner"}
          </Button>
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>

      <div className="relative h-[200px] w-full rounded-lg overflow-hidden border-2 border-dashed border-gray-200">
        {currentBanner ? (
          <Image
            src={currentBanner}
            alt="Hotel Banner"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <ImageIcon className="h-10 w-10 text-gray-400 mx-auto" />
              <p className="mt-2 text-sm text-gray-500">No banner uploaded</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}