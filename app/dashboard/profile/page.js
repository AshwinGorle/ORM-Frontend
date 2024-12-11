"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import BannerUpload from "@/components/profile/BannerUpload";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    hotelName: "The Grand Hotel & Resort",
    ownerName: "Manali Thakur",
    description: "Experience luxury redefined at The Grand Hotel & Resort. Nestled in the heart of the city, we offer world-class amenities, exceptional dining, and unparalleled service for an unforgettable stay.",
    location: "Mall road , manali",
    profilePhoto: "https://images.trvl-media.com/lodging/35000000/34920000/34914700/34914632/0902a974.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    bannerImage: "https://images.trvl-media.com/lodging/31000000/30060000/30056300/30056226/fc4a7feb.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    contactEmail: "hotelmanali@gmail.com",
    phone: "+91 98765 43210",
    cuisine: "Fine Dining & Family restaurant",
    openingHours: "24/7 Service"
  });

  const handleProfileUpdate = (updatedProfile) => {
    setProfile({ ...profile, ...updatedProfile });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <ProfileHeader profile={profile} />
      
      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <ProfileForm profile={profile} onUpdate={handleProfileUpdate} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <BannerUpload 
              currentBanner={profile.bannerImage}
              onBannerUpdate={(url) => handleProfileUpdate({ bannerImage: url })}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}