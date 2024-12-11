"use client";

import { Building2, MapPin, Phone, Mail, Clock, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfileHeader({ profile }) {
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
            src={profile.bannerImage}
            alt="Hotel Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <Badge className="mb-2 bg-primary/80 hover:bg-primary/90">
              <UtensilsCrossed className="w-3 h-3 mr-1" />
              {profile.cuisine}
            </Badge>
            <h2 className="text-3xl font-bold mb-1">{profile.hotelName}</h2>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {profile.location}
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative h-32 w-32 rounded-xl overflow-hidden border-4 border-background shadow-lg flex-shrink-0">
              <Image
                src={profile.profilePhoto}
                alt={profile.hotelName}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-4">
              <p className="text-muted-foreground">{profile.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{profile.contactEmail}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Hours</p>
                    <p className="font-medium">{profile.openingHours}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{profile.location}</p>
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