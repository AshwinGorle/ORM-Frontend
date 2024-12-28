// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useDispatch, useSelector } from "react-redux";
// import { orderActions } from "@/redux/slices/orderSlice";
// import { Spinner } from "@/components/ui/spinner";

// import { useDeleteOrder } from "@/hooks/order/useDeleteOrder";

// export function DeleteOrderModal() {
//   const open = useSelector((state) => state.order.openDeleteOrderDialog);
//   const dispatch = useDispatch();
//   let order = useSelector((state) => state.order.selectedDeleteOrder);

//   console.log("Deleting order ------", order);

//   const { loading, handleDeleteOrder } = useDeleteOrder();

//   const handleDeleteOrderLocal = () => {
//     if (order) handleDeleteOrder(order._id.toString());
//   };

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={() => {
//         dispatch(orderActions.setOpenDeleteOrder(false));
//         dispatch(orderActions.setSelectedDeleteOrder(null));
//       }}
//     >
//       <DialogContent className="sm:max-w-[625px]">
//         <DialogHeader>
//           <DialogTitle>Delete Order</DialogTitle>
//         </DialogHeader>
        
//           {order ? (
//             <Button variant="destructive" onClick={() => handleDeleteOrderLocal()}>
//               {loading ? <Spinner /> : "Delete order"}
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
import { orderActions } from "@/redux/slices/orderSlice";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteOrder } from "@/hooks/order/useDeleteOrder";
import { AlertTriangle } from 'lucide-react';

export function DeleteOrderModal() {
  const open = useSelector((state) => state.order.openDeleteOrderDialog);
  const dispatch = useDispatch();
  let order = useSelector((state) => state.order.selectedDeleteOrder);

  const { loading, handleDeleteOrder } = useDeleteOrder();

  const handleDeleteOrderLocal = () => {
    if (order) handleDeleteOrder(order._id.toString());
  };

  const handleClose = () => {
    dispatch(orderActions.setOpenDeleteOrder(false));
    dispatch(orderActions.setSelectedDeleteOrder(null));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Order
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this order? This action cannot be undone.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          {order ? (
            <Button 
              variant="destructive" 
              onClick={handleDeleteOrderLocal} 
              className="w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? <Spinner className="mr-2 h-4 w-4" /> : null}
              {loading ? "Deleting..." : "Delete Order"}
            </Button>
          ) : (
            <Spinner />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



