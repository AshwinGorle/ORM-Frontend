  "use client";

  import { useState } from "react";
  import { Plus } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import OfferCard from "@/components/offers/OfferCard";
  import { AddOfferDialog } from "@/components/offers/AddOfferDialog";
  import { EditOfferDialog } from "@/components/offers/EditOfferDialog";
  import { useGetAllOffers } from "@/hooks/offer/useGetAllOffers";
  import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { DeleteOfferDialog } from "@/components/offers/DeleteOfferDialog";

  export default function OffersPage() {
    const router = useRouter();
    const [offers, setOffers] = useState([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const {offers : myOffers , loading} = useGetAllOffers();
    
    console.log("offer in comp :", myOffers)
    const handleEditOffer = (updatedOffer) => {
      setOffers(offers.map((offer) => 
        offer.id === updatedOffer.id ? updatedOffer : offer
      ));
      setIsEditDialogOpen(false);
      setSelectedOffer(null);
    };

    const handleDeleteOffer = (offerId) => {
      setOffers(offers.filter((offer) => offer.id !== offerId));
    };

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Offer Management</h1>
            <p className="text-muted-foreground">
              Create and manage special offers and discounts
            </p>
          </div>
          <Button
            // onClick={() => setIsAddDialogOpen(true)}
            onClick={() => router.push('/dashboard/configuration/offers/create-offer')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Offer
          </Button>
        </div>
        
        {loading && <Spinner/>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myOffers?.map((offer) => (
            <OfferCard
              key={offer._id}
              offer={offer}
              onEdit={() => {
                setSelectedOffer(offer);
                setIsEditDialogOpen(true);
              }}
              onDelete={() => handleDeleteOffer(offer.id)}
            />
          ))}
          {offers.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No offers available. Click &apos;Add Offer&apos; to create one.
            </div>
          )}
        </div>


       <DeleteOfferDialog />
   

        <AddOfferDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
        />

        {/* <EditOfferDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          offer={selectedOffer}
          onEdit={handleEditOffer}
        /> */}
      </div>
    );
  }