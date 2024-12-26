"use client";

import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditableImage } from "../ImageInput";
import { Input } from "../ui/input";

export default function  ProfileHeader({
  ownerProfile,
  setOwnerProfile,
  ownerEmail,
  setOwnerEmail,
  ownerPhone,
  setOwnerPhone,
  hotelName,
  hotelLocation,
  setHotelLocation,
  hotelBanner,
  hotelDescription
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hotel Profile</h1>
          <p className="text-muted-foreground">
            Manage your hotel information and settings
          </p>
        </div>
        <Building2 className="h-8 w-8 text-primary" />
      </div>

      <Card className="overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={hotelBanner}
            alt="Hotel Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <Badge className="mb-2 bg-primary/80 hover:bg-primary/90">
              <UtensilsCrossed className="w-3 h-3 mr-1" />
              {"-----"}
            </Badge>
            <h2 className="text-3xl font-bold mb-1">{hotelName}</h2>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {hotelLocation}
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative h-32 w-32 rounded-xl overflow-hidden border-4 border-background shadow-lg flex-shrink-0">
              <EditableImage
                imageUrl={ownerProfile}
                setImageUrl={setOwnerProfile}
                height={120}
                width={120}
              />
            </div>

            <div className="flex-1 space-y-4">
              <input type='text' className="text-muted-foreground">{hotelDescription}</input>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <Input value={ownerPhone}  onChange={(e)=>setOwnerPhone(e.target.value)} />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <Input value={ownerEmail} onChange={(e)=>setOwnerEmail(e.target.value)} />

                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Hours</p>
                    <p className="font-medium">{"24/7"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <Input value={hotelLocation} onChange={(e)=>setHotelLocation(e.target.value)} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
