'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Pencil, Loader2 } from 'lucide-react'
import { defaultDishLogo } from '@/config/config'
import { useCreateUpload } from '@/hooks/upload/useCreateUpload'

export function EditableImage({ imageUrl = null, size = 200, setImageUrl, element }) {
  const [loading, setLoading] = useState(false)
  // const [previewUrl, setPreviewUrl] = useState(imageUrl)
  const fileInputRef = useRef(null)
  const {data, loading : uploadLoading, handleCreateUpload} = useCreateUpload(setImageUrl);

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = async (file) => {
    // Simulating an upload delay
    console.log("file in handle image change ", file);
    const uploadData = {
      file, 
      fileName : element?._id || Math.random() * 1000,
      folderName : `Dishes/${element?.hotelId || "newOMSFolder"}` 
    }
    handleCreateUpload(uploadData);
    // const newImageUrl = URL.createObjectURL(file);
    // setPreviewUrl(newImageUrl);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    console.log("file -----", file)
    if (file) {
      // setLoading(true)
      try {
        handleImageChange(file);
        const objectUrl = URL.createObjectURL(file)
        // setPreviewUrl(objectUrl)
        console.log("object url ", objectUrl)
      } catch (error) { 
        console.error('Error changing image:', error)
        // setPreviewUrl(imageUrl)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div 
      className="relative border-2 border-black rounded-xl overflow-hidden" 
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full overflow-hidden bg-secondary">
        {uploadLoading || !imageUrl ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="h-1/3 w-1/3 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Image
            src={imageUrl || defaultDishLogo}
            alt="image"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <Button
        size="icon"
        variant="secondary"
        className="absolute bottom-0 right-0 rounded-full shadow-md"
        onClick={handleImageClick}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}
