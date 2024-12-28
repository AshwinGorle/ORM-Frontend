import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteOffer } from "@/hooks/offer/useDeleteOffer";
import { offerActions } from "@/redux/slices/offerSlice";

export function DeleteOfferDialog() {
  const dispatch = useDispatch();
  const {offer, open} = useSelector((state)=> state.offer.deleteOfferDialogDetails);
  const {loading : deleteOfferLoading, handleDeleteOffer} = useDeleteOffer();

  console.log("Deleting offer ------", offer);

  const handleDeleteOfferLocal = () => {
    if(offer) handleDeleteOffer(offer._id.toString());
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        dispatch(offerActions.closeDeleteOfferDialog());
      }}
    >
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Delete Offer</DialogTitle>
        </DialogHeader>
        
          {offer ? (
            <Button variant="destructive" onClick={() => handleDeleteOfferLocal()}>
              {deleteOfferLoading ? <Spinner /> : "Delete order"}
            </Button>
          ) : (
            <Spinner />
          )}
        
        <DialogFooter>
          <div className="text-yellow-600">Operation can not be reverted!</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
