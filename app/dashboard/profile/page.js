"use client";

import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import BannerUpload from "@/components/profile/BannerUpload";
import { Card, CardContent } from "@/components/ui/card";
import { useGetUser } from "@/hooks/auth";
import { useUpdateOwner } from "@/hooks/owner/useUpdateOwner";
import { useGetHotel } from "@/hooks/hotel/useGetHotel";
import { useUpdateHotel } from "@/hooks/hotel/useUpdateHotel";
import { defaultDishLogo } from "@/config/config";

export default function ProfilePage() {
  const { loading: userLoading, user: owner } = useGetUser();
  const { loading: updateOwnerLoading, handleUpdateOwner } = useUpdateOwner();
  const { loading: hotelLoading, hotel } = useGetHotel(owner?.hotelId);
  const { loading: updateHotelLoading, handleUpdateHotel } = useUpdateHotel();

  console.log(" owner : ", owner);
  console.log(" hotel : ", hotel);

  const [profile, setProfile] = useState({
    hotelName: "The Grand Hotel & Resort",
    ownerName: "Manali Thakur",
    description:
      "Experience luxury redefined at The Grand Hotel & Resort. Nestled in the heart of the city, we offer world-class amenities, exceptional dining, and unparalleled service for an unforgettable stay.",
    location: "Mall road , manali",
    profilePhoto:
      "https://images.trvl-media.com/lodging/35000000/34920000/34914700/34914632/0902a974.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    bannerImage:
      "https://images.trvl-media.com/lodging/31000000/30060000/30056300/30056226/fc4a7feb.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    contactEmail: "hotelmanali@gmail.com",
    phone: "+91 98765 43210",
    cuisine: "Fine Dining & Family restaurant",
    openingHours: "24/7 Service",
  });

  const [hotelName, setHotelName] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelBanner, setHotelBanner] = useState(
    "https://th.bing.com/th/id/OIP.7Krrd7bmxw3eDbLGtPhBZQHaEK?rs=1&pid=ImgDetMain"
  );
  const [hotelPhone, setHotelPhone] = useState("");
  const [hotelEmail, setHotelEmail] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");

  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [gender, setGender] = useState("");
  const [ownerProfile, setOwnerProfile] = useState(
    "https://th.bing.com/th/id/OIP.7Krrd7bmxw3eDbLGtPhBZQHaEK?rs=1&pid=ImgDetMain"
  );

  useEffect(() => {
    // hotel
    if (hotel) {
      setHotelName(hotel?.name || "");
      setHotelEmail(hotel?.email || "");
      setHotelLocation(hotel?.location || "");
      setHotelPhone(hotel?.phone || "");
      setHotelBanner(hotel?.hotel?.logo || defaultDishLogo);
      setHotelDescription(hotel.description || "");
    }
    if(owner){
      setOwnerName(owner?.name || "");
      setOwnerEmail(owner?.email || "");
      setOwnerProfile(owner?.logo || defaultDishLogo);
      setOwnerPhone(owner?.phone );
      setGender(owner?.gender || "");
    }
  }, [hotel, owner]);
  
  const handleUpdateOwnerAndHotel = ()=>{
    if(owner && hotel){
      const updatedOwner = {logo : ownerProfile, phone : ownerPhone, email: ownerEmail, gender : gender }
      const updatedHotel = {name : hotelName,location : hotelLocation ,logo : hotelBanner, description : hotelDescription, email : hotelEmail, phone : hotelPhone}
      handleUpdateOwner(owner._id.toString(), updatedOwner);
      // handleUpdateHotel(hotel._id.toString(), updatedHotel)
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <ProfileHeader
        ownerName={ownerName}
        setOwnerName={setOwnerName}
        ownerEmail={ownerEmail}
        setOwnerEmail={setOwnerEmail}
        ownerPhone={ownerPhone}
        setOwnerPhone={setOwnerPhone}
        ownerProfile={ownerProfile}
        setOwnerProfile={setOwnerProfile}
        hotelLocation={hotelLocation}
        setHotelLocation={setHotelLocation}
        hotelName={hotelName}
        hotelBanner={hotelBanner}
      />

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <ProfileForm
              ownerEmail={ownerEmail}
              ownerName={ownerName}
              setOwnerName={setOwnerName}
              setOwnerEmail={ownerEmail}
              hotelName={hotelName}
              setHotelName={setHotelName}
              hotelPhone={hotelPhone}
              setHotelPhone={setHotelPhone}
              hotelEmail={hotelEmail}
              hotelLocation={hotelLocation}
              setHotelLocation={setHotelLocation}
              hotelDescription={hotelDescription}
              setHotelDescription={setHotelDescription}
              handleUpdateOwnerAndHotel={handleUpdateOwnerAndHotel}
              updateHotelLoading={updateHotelLoading}
              updateUserLoading={updateOwnerLoading}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <BannerUpload
              currentBanner={hotelBanner}
              onBannerUpdate={setHotelBanner}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
