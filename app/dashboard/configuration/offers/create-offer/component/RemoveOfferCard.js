"use client";

import { MoreVertical, Calendar, Tag, Percent } from "lucide-react";
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
import { useRemoveOffer } from "@/hooks/dish/useRemoveOffer";
import { Spinner } from "@/components/ui/spinner";

export default function RemoveOfferCard({ offer, dishId }) {
  const { loading, handleRemoveOffer } = useRemoveOffer();

  const getDiscountText = () => {
    return offer.discountType === "percentage"
      ? `${offer.value}% off`
      : `₹${offer.value} off`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center gap-3">
          {/* Image on the left side of the title */}
          {offer.logo && (
            <img
              src={offer.logo}
              alt={`${offer.title} logo`}
              className="w-10 h-10 rounded-md border border-black"
            />
          )}
          <CardTitle className="text-xl font-bold">{offer.title}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Offer</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
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
            <span>{getExpiryTimeInWords(offer.endDate) + " remaining"}</span>
          </div>
        </div>
        <div className="flex justify-between">
          {!offer.disable && (
            <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
              Active
            </Badge>
          )}
          <Button
            variant="destructive"
            onClick={() => handleRemoveOffer(dishId)}
          >
            {" "}
            {loading ? <Spinner/> : "Remove"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
