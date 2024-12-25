import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, DollarSign, Info, ArrowLeft } from "lucide-react";
import { useUpdateOrderStatus } from "@/hooks/order/useUpdateOrderStatus";
import { Spinner } from "@/components/ui/spinner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function MyKanbanOrderCard({ order }) {
  const {
    loading,
    updatingOrderId,
    leftLoading,
    rightLoading,
    handleUpdateOrderStatus,
  } = useUpdateOrderStatus();
  
  const totalItems = order.dishes.reduce((sum, dish) => sum + dish.quantity, 0);
  const totalAmount = order.dishes.reduce(
    (sum, dish) => sum + (dish.dishId?.price * dish.quantity),
    0
  );

  const handlePrevStatus = () => {
    const allStatus = ["draft", "pending", "preparing", "completed"];
    const indexOfCurrentStatus = allStatus.indexOf(order.status);
    if (indexOfCurrentStatus === -1) {
      console.log("invalid status : ", order.status);
      return;
    }
    if (indexOfCurrentStatus === 0) {
      console.log("already in first stage can't move previous");
      return;
    }
    const prevStatus = allStatus[indexOfCurrentStatus - 1];
    handleUpdateOrderStatus(order._id.toString(), prevStatus, "left");
  };

  return (
    <Card className="w-full mb-2">
      <CardContent className="p-2 flex justify-between items-center">
        <Button variant="outline" onClick={handlePrevStatus} size="sm">
          {loading && updatingOrderId && leftLoading && updatingOrderId === order._id.toString() ? (
            <Spinner />
          ) : (
            <ArrowLeft className="h-4 w-4" />
          )}
        </Button>
        <div className="flex items-center gap-2">
          <Utensils className="h-4 w-4" />
          <span>{totalItems} items</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Order Details</h4>
                <p className="text-sm text-muted-foreground">Order ID: {order._id}</p>
              </div>
              <div className="grid gap-2">
                {order.dishes.map((dish) => (
                  <div key={dish._id} className="grid grid-cols-3 items-center gap-4">
                    <span className="text-sm">{dish.dishId?.name}</span>
                    <span className="text-sm">x{dish.quantity}</span>
                    <span className="text-sm">₹{(dish.dishId?.price * dish.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              {order.note && (
                <div className="grid gap-2">
                  <div className="font-medium">Note:</div>
                  <div className="text-sm">{order.note}</div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
