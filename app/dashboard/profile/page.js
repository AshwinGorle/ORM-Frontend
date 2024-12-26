"use client";

import { useState } from "react";
import { Building2, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfileSection from "@/components/profile/UserProfileSection";
import HotelProfileSection from "@/components/profile/HotelProfileSection";
import { useGetUser } from "@/hooks/auth";
import { Spinner } from "@/components/ui/spinner";
import { useGetHotel } from "@/hooks/hotel/useGetHotel";

// Mock data - Replace with actual API calls
const user = {
  logo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60",
  gender: "M",
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+1234567890",
  password: "password123",
  role: "Manager",
  hotelId: "64a7bcf7f2b2c48d7e8a9d6f",
  isApproved: true,
  isVerified: true,
  otpDetails: {
    value: null,
    expiry: null
  },
  membershipExpires: "2025-12-31T00:00:00.000Z"
};

const hotel = {
  name: "Luxury Stay Hotel",
  location: "123 Main Street, Springfield",
  phone: "+1234567890",
  email: "info@luxurystay.com",
  ownerId: "64a8d2e4a5b3c79f1a8e5c2d",
  logo: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1470",
  description: "A premium hotel offering luxurious stays and world-class amenities."
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("user");
  const {loading : ownerLoading, user : owner} = useGetUser();
  const {loading : hotelLoading, hotel} = useGetHotel(owner?.hotelId);
  console.log("ownerrrrrrrr", owner)

  const handleUserUpdate = (updatedUser) => {
    console.log("Updating user:", updatedUser);
    // Implement user update logic here
  };

  const handleHotelUpdate = (updatedHotel) => {
    console.log("Updating hotel:", updatedHotel);
    // Implement hotel update logic here
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your personal and hotel information
          </p>
        </div>
        <Building2 className="h-8 w-8 text-primary" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="user" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            User Profile
          </TabsTrigger>
          <TabsTrigger value="hotel" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Hotel Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="space-y-6">
          {(ownerLoading  ||  !owner ) ? <Spinner/> : <UserProfileSection owner={owner} />}
        </TabsContent>

        <TabsContent value="hotel" className="space-y-6">
          {(hotelLoading || ownerLoading) ? <Spinner/> : <HotelProfileSection hotel={hotel}  />}
        </TabsContent>
      </Tabs>
    </div>
  );
}

