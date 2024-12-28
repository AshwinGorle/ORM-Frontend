// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { Spinner } from "@/components/ui/spinner";
// import { useDeleteOffer } from "@/hooks/offer/useDeleteOffer";
// import { offerActions } from "@/redux/slices/offerSlice";

// export function DeleteOfferDialog() {
//   const dispatch = useDispatch();
//   const {offer, open} = useSelector((state)=> state.offer.deleteOfferDialogDetails);
//   const {loading : deleteOfferLoading, handleDeleteOffer} = useDeleteOffer();

//   console.log("Deleting offer ------", offer);

//   const handleDeleteOfferLocal = () => {
//     if(offer) handleDeleteOffer(offer._id.toString());
//   };

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={() => {
//         dispatch(offerActions.closeDeleteOfferDialog());
//       }}
//     >
//       <DialogContent className="sm:max-w-[625px]">
//         <DialogHeader>
//           <DialogTitle>Delete Offer</DialogTitle>
//         </DialogHeader>
        
//           {offer ? (
//             <Button variant="destructive" onClick={() => handleDeleteOfferLocal()}>
//               {deleteOfferLoading ? <Spinner /> : "Delete order"}
//             </Button>
//           ) : (
//             <Spinner />
//           )}
        
//         <DialogFooter>
//           <div className="text-yellow-600">Operation can not be reverted!</div>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// bhai ye improved delete offer dialog hai
import React from "react";
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
import { AlertTriangle } from 'lucide-react';

export function DeleteOfferDialog() {
  const dispatch = useDispatch();
  const { offer, open } = useSelector((state) => state.offer.deleteOfferDialogDetails);
  const { loading: deleteOfferLoading, handleDeleteOffer } = useDeleteOffer();

  const handleDeleteOfferLocal = () => {
    if (offer) handleDeleteOffer(offer._id.toString());
  };

  const handleClose = () => {
    dispatch(offerActions.closeDeleteOfferDialog());
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Offer
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this offer? This action cannot be undone.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          {offer ? (
            <Button 
              variant="destructive" 
              onClick={handleDeleteOfferLocal} 
              className="w-full sm:w-auto"
              disabled={deleteOfferLoading}
            >
              {deleteOfferLoading ? <Spinner className="mr-2 h-4 w-4" /> : null}
              {deleteOfferLoading ? "Deleting..." : "Delete Offer"}
            </Button>
          ) : (
            <Spinner />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

