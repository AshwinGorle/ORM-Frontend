import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "@/redux/slices/orderSlice";
import { Spinner } from "@/components/ui/spinner";
import SelectMultipleDishesForOrder from "@/components/orders/component/SelectMultipleDishesForOrder";
import DisplayMultipleDishesForOrder from "@/components/orders/component/DisplayultipleDishesForOrder";
import { useUpdateOrder } from "@/hooks/order/useUpdateOrder";
import { Clock, Utensils, User, MapPin, Receipt, PenSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatPrice } from "@/lib/utils";

export function UpdateOrderModal() {
  const dispatch = useDispatch();
  const {open, order} = useSelector((state)=> state.order.editOrderDialog);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const { loading: updateLoading, handleUpdateOrder } = useUpdateOrder();

  useEffect(() => {
    if (order) {
      const dishesInOrder = order?.dishes || [];
      const dishesInSelectedDishFormat = dishesInOrder.map((dish) => ({
        ...dish.dishId,
        orderQuantity: dish?.quantity || 0,
        note: dish?.note || ""
      }));
      setSelectedDishes(dishesInSelectedDishFormat);
    }
  }, [order]);

  const handleSubmit = async () => {
    if (!order) return;
    
    const selectedDishesInApiFormat = selectedDishes.map((dish) => ({
      dishId: dish._id,
      quantity: dish.orderQuantity,
      note: dish.note || "",
    }));

    await handleUpdateOrder(order._id, { 
      dishes: selectedDishesInApiFormat 
    });
    
    handleClose();
  };

  const handleClose = () => {
      dispatch(orderActions.setEditOrderDialog({order : null, open :false}))
  };

  const totalAmount = selectedDishes.reduce(
    (sum, dish) => sum + (dish.price * dish.orderQuantity),
    0
  );

  if (!order) return null;

  return (
    <Dialog 
      open={open} 
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <PenSquare className="h-6 w-6" />
            Update Order #{order._id.slice(-6)}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6 p-6">
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{order.customerId?.name || 'Guest'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>Table {order.tableId?.sequence}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{order.status}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Receipt className="h-5 w-5 text-gray-500" />
                  <h3 className="font-semibold text-lg">Current Order Items</h3>
                </div>
                <div className="space-y-3">
                  {selectedDishes?.map((dish, index) => (
                    <div
                      key={dish._id}
                      className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{dish.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatPrice(dish.price)} × {dish.orderQuantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatPrice(dish.price * dish.orderQuantity)}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 border-t">
                    <p className="text-gray-600">Total Amount</p>
                    <p className="text-lg font-bold">{formatPrice(totalAmount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <SelectMultipleDishesForOrder
                selectedInputs={selectedDishes}
                setSelectedInputs={setSelectedDishes}
              />
              <DisplayMultipleDishesForOrder
                selectedInputs={selectedDishes}
                setSelectedInputs={setSelectedDishes}
              />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} className="w-full sm:w-auto">
            {updateLoading ? <Spinner className="mr-2" /> : <PenSquare className="w-4 h-4 mr-2" />}
            {updateLoading ? "Updating..." : "Update Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
