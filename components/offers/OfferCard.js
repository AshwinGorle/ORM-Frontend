"use client";

import { MoreVertical, Calendar, Tag, Percent , CalendarCheck, CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getExpiryTimeInWords from "@/utils/getExpiryInWords";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { offerActions } from "@/redux/slices/offerSlice";

export default function OfferCard({ offer, onEdit, onDelete }) {
  console.log(offer);
  const router = useRouter();
  const dispatch = useDispatch();
  const getDiscountText = () => {
    return offer.discountType === 'percentage' 
      ? `${offer.value}% off`
      : `₹${offer.value} off`;
  };

  const formatDate = (date) => {
    if (!date) return 'Not Available';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); // Add leading zero if day is single digit
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero if month is single digit
    const year = d.getFullYear();
    return `${day}/${month}/${year}`; // Return date in DD/MM/YYYY format
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center gap-3">
          {/* Image on the left side of the name */}
          {offer.logo && (
            <img
              src={offer.logo}
              alt={`${offer.name} logo`}
              className="w-10 h-10 rounded-md border border-black"
            />
          )}
          <CardTitle className="text-xl font-bold">{offer.name}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={()=>router.push(`/dashboard/configuration/offers/offer-details/${offer._id}`)}>Edit Offer</DropdownMenuItem>
            <DropdownMenuItem 
              onClick={()=>dispatch(offerActions.openDeleteOfferDialog(offer))}
              className="text-red-600 focus:text-red-600"
            >
              Delete Offer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{offer.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {offer.type}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Percent className="h-3 w-3" />
            {getDiscountText()}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          {offer.appliedAbove > 0 && (
            <p className="text-muted-foreground">
              Valid on orders above ₹{offer.appliedAbove}
            </p>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {getExpiryTimeInWords(offer.endDate) + " remaining"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
            <p className="text-green-500 flex items-center gap-1">
              <CalendarCheck className="h-4 w-4" />
              <strong>Start Date:</strong> {formatDate(offer.startDate)}
            </p>
            <p className="text-red-500 flex items-center gap-1">
              <CalendarX className="h-4 w-4" />
              <strong>End Date:</strong> {formatDate(offer.endDate)}
            </p>
          </div>

        {!offer.disable && (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Active
          </Badge>
        )}
      </CardContent>
    </Card>
  ); 
}
