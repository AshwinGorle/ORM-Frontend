import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "@/redux/slices/orderSlice";
import { Spinner } from "@/components/ui/spinner";

import { useDeleteOrder } from "@/hooks/order/useDeleteOrder";

export function DeleteOrderModal() {
  const open = useSelector((state) => state.order.openDeleteOrderDialog);
  const dispatch = useDispatch();
  let order = useSelector((state) => state.order.selectedDeleteOrder);

  console.log("Deleting order ------", order);

  const { loading, handleDeleteOrder } = useDeleteOrder();

  const handleDeleteOrderLocal = () => {
    if (order) handleDeleteOrder(order._id.toString());
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        dispatch(orderActions.setOpenDeleteOrder(false));
        dispatch(orderActions.setSelectedDeleteOrder(null));
      }}
    >
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
        </DialogHeader>
        
          {order ? (
            <Button variant="destructive" onClick={() => handleDeleteOrderLocal()}>
              {loading ? <Spinner /> : "Delete order"}
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
