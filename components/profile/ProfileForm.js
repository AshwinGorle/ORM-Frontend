"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "../ui/spinner";

export default function ProfileForm({
  hotelName,
  setHotelName,
  hotelPhone,
  setHotelPhone,
  hotelEmail,
  setHotelEmail,
  ownerEmail,
  setOwnerEmail,
  ownerName,
  setOwnerName,
  hotelLocation,
  setHotelLocation,
  hotelDescription,
  setHotelDescription,
  handleUpdateOwnerAndHotel,
  updateHotelLoading,
  updateUserLoading
  
}) {
  const[isEditing, setIsEditing] = useState(false);
  return (
    <form className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Hotel Information</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={()=>handleUpdateOwnerAndHotel()}>
              { updateHotelLoading ||updateUserLoading ? <Spinner/> : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="hotelName">Hotel Name</Label>
          <Input
            id="hotelName"
            name="hotelName"
            value={hotelName}
            onChange={(e)=>setHotelName(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            value={ownerName}
            onChange={(e)=>setOwnerName(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={ownerEmail}
            onChange={(e)=>setOwnerEmail(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={hotelPhone}
            onChange={(e)=>setHotelPhone(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cuisine">Cuisine Type</Label>
          <Input
            id="cuisine"
            name="cuisine"
            value={"-----"}
          
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="openingHours">Opening Hours</Label>
          <Input
            id="openingHours"
            name="openingHours"
            value={"24/7"}
            // onChange={handleChange}
            disabled={true}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={hotelLocation}
            onChange={(e)=>setHotelLocation(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={hotelDescription}
            onChange={(e)=>setHotelDescription(e.target.value)}
            disabled={!isEditing}
            rows={4}
          />
        </div>
      </div>
    </form>
  );
}