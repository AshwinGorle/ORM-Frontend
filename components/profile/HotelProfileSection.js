"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Mail, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import ImageUploadButton from "./ImageUploadButton";
import { defaultBannerLogo, defaultDishLogo } from "@/config/config";
import { useUpdateHotel } from "@/hooks/hotel/useUpdateHotel";
import { Spinner } from "../ui/spinner";
import { EditableImage } from "../ImageInput";
import { formatDate } from "@/lib/utils";

export default function HotelProfileSection({ hotel }) {
  const [formData, setFormData] = useState(hotel);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const {loading : updateOwnerLoading, handleUpdateHotel} = useUpdateHotel();
  const [logo, setLogo] = useState(hotel?.logo || defaultBannerLogo)
  console.log("hotel in hotel component ", hotel)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = async (file) => {
    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, logo: imageUrl }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedHotel = {
      name : formData.name,
      email : formData.email,
      description : formData.description,
      location : formData.location,
      phone : formData.phone,
      logo : logo
    }
    console.log("update data for hotel ::::::::::::", updatedHotel)
    handleUpdateHotel(hotel._id.toString(), updatedHotel);
  
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="space-y-6">
            <div className="relative h-48 sm:h-64 w-full">
              <Image
                src={formData?.logo || defaultBannerLogo}
                alt={formData?.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-2xl font-bold truncate">{formData.name}</h2>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{formData.location}</span>
                </div>
              </div>
              {isEditing && (
                <div className="absolute top-4 right-4">
                  <ImageUploadButton 
                    onImageSelect={handleImageSelect}
                    loading={isUploading}
                  />
                </div>
              )}
            </div>

            <div className="p-6">
              {!isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InfoItem icon={Building2} label="Hotel Name" value={formData.name} />
                    <InfoItem icon={MapPin} label="Location" value={formData.location} />
                    <InfoItem icon={Phone} label="Phone" value={formData.phone} />
                    <InfoItem icon={Mail} label="Email" value={formData.email} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <p className="text-muted-foreground">{formData.description}</p>
                  </div>
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:w-auto"
                  >
                    Edit Hotel Details
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Hotel Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                  <EditableImage imageUrl={logo} setImageUrl={setLogo} element={hotel} />
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="submit" className="flex-1 sm:flex-none">
                     {updateOwnerLoading ? <Spinner/> : 'Save Changes'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 sm:flex-none"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="p-2 bg-primary/10 rounded-full">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium truncate">{value}</p>
      </div>
    </div>
  );
}