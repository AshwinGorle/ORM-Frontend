"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import ProfileImage from "./ProfileImage";
import { useGetUser } from "@/hooks/auth";
import { useUpdateOwner } from "@/hooks/owner/useUpdateOwner";
import { defaultDishLogo, defaultProfileLogo } from "@/config/config";
import { EditableImage } from "../ImageInput";
import { Spinner } from "../ui/spinner";
import { useDispatch } from "react-redux";

export default function UserProfileSection({ owner }) {
  console.log(":::::::::::re rendeting after update:::::::::::::", owner)
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(owner);
  const {loading : updateOwnerLoading, handleUpdateOwner} = useUpdateOwner(setIsEditing);
  const [logo, setLogo] = useState(owner?.logo || defaultProfileLogo)

  useEffect(()=>{
    setFormData(owner)
    setLogo(owner?.logo || defaultProfileLogo);
  },[owner])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      logo : logo,
      name : formData.name,
      email : formData.email,
      phone : formData.phone,
      gender : formData.gender
    }
    console.log("updated user : ", updatedUser)
    handleUpdateOwner(owner._id.toString(), updatedUser);
    
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center space-y-4">
              {/* <ProfileImage
                src={formData.logo}
                alt={formData.name}
                onImageUpdate={handleImageUpdate}
              /> */}
              <EditableImage imageUrl={logo} setImageUrl={setLogo} element={owner} disableEdit={!isEditing} />
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">
                  {owner.role}
                </Badge>
                {owner.isVerified && (
                  <Badge variant="default" className="bg-green-500">
                    Verified
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-6">
              {!isEditing ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InfoItem icon={User} label="Name" value={owner.name} />
                    <InfoItem icon={Mail} label="Email" value={owner.email} />
                    <InfoItem icon={Phone} label="Phone" value={owner.phone} />
                    <InfoItem
                      icon={Calendar}
                      label="Membership Expires"
                      value={formatDate(owner.membershipExpires)}
                    />
                  </div>
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:w-auto"
                  >
                    Edit Profile
                  </Button>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
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
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="submit" className="flex-1 sm:flex-none">
                      {updateOwnerLoading ? <Spinner/> : "Save Changes"}
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
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}