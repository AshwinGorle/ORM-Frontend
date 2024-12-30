"use client";

import { useState } from "react";
import { Building2, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfileSection from "@/components/profile/UserProfileSection";
import HotelProfileSection from "@/components/profile/HotelProfileSection";
import { useGetUser } from "@/hooks/auth";
import { Spinner } from "@/components/ui/spinner";
import { useGetHotel } from "@/hooks/hotel/useGetHotel";


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("user");
  const {loading : ownerLoading, user : owner} = useGetUser();
  const {loading : hotelLoading, hotel} = useGetHotel(owner?.hotelId);
  console.log("ownerrrrrrrr", owner)

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

