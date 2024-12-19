import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Utensils,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateOrderStatus } from "@/hooks/order/useUpdateOrderStatus";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch } from "react-redux";
import { orderActions } from "@/redux/slices/orderSlice";

export function MyKanbanCard({ order }) {
  const dispatch = useDispatch();
  const {
    loading,
    updatingOrderId,
    leftLoading,
    rightLoading,
    handleUpdateOrderStatus,
  } = useUpdateOrderStatus();
  const totalItems = order.dishes.reduce((sum, dish) => sum + dish.quantity, 0);
  const totalAmount = order.dishes.reduce(
    (sum, dish) => sum + dish.dishId.price * dish.quantity,
    0
  );

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const allStatus = ["draft", "pending", "preparing", "completed"];

  const handleNextStatus = () => {
    const indexOfCurrentStatus = allStatus.indexOf(order.status);
    if (indexOfCurrentStatus == -1) {
      console, log("invalid status : ", order.status);
      return;
    }
    if (indexOfCurrentStatus == 3) {
      console.log("already completed cant move next");
      return;
    }
    const nextStatus = allStatus[indexOfCurrentStatus + 1];

    handleUpdateOrderStatus(order._id.toString(), nextStatus, "right");
  };

  const handlePrevStatus = () => {
    const indexOfCurrentStatus = allStatus.indexOf(order.status);
    if (indexOfCurrentStatus == -1) {
      console, log("invalid status : ", order.status);
      return;
    }
    if (indexOfCurrentStatus == 0) {
      console.log("already in first stage can'tt move previous");
      return;
    }
    const prevStatus = allStatus[indexOfCurrentStatus - 1];
    handleUpdateOrderStatus(order._id.toString(), prevStatus, "left");
  };
  
  const handleEditOrder = ()=>{
    dispatch(orderActions.setSelectedEditOrder(order));
       dispatch(orderActions.setOpenEditOrder(true));
    }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-base">
          <div className="flex gap-2">
            <div className=" bg-black p-1 rounded-sm" onClick={()=>handleEditOrder()} >
              <Pencil color="white" className="h-4 w-4"  />
            </div>

            <span>Table {order.tableId.sequence}</span>
          </div>
          <Badge
            variant={
              order.status === "pending"
                ? "secondary"
                : order.status === "preparing"
                ? "secondary"
                : "success"
            }
          >
            {order.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{order.customerId.name}</span>
          </div>
          <div className="flex items-center gap-1 justify-end">
            <Clock className="h-3 w-3" />
            <span>{formatTime(order.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Utensils className="h-3 w-3" />
            <span>{totalItems} items</span>
          </div>
          <div className="text-right font-semibold">
            ${totalAmount.toFixed(2)}
          </div>
        </div>
        <div className="mt-2 space-y-1 text-sm">
          {order.dishes.map((dish) => (
            <div key={dish._id} className="flex items-start">
              <span className="mr-2">•</span>
              <span className="flex-grow">{dish.dishId.name}</span>
              <span className="font-medium">x{dish.quantity}</span>
            </div>
          ))}
        </div>
        {order.note && (
          <div className="mt-2 text-xs italic">Note: {order.note}</div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full flex justify-between">
          <Button
            variant="outline"
            onClick={() => handlePrevStatus()}
            size="sm"
          >
            {loading &&
            updatingOrderId &&
            leftLoading &&
            updatingOrderId == order._id.toString() ? (
              <Spinner />
            ) : (
              <ArrowLeft className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNextStatus()}
            size="sm"
          >
            {loading &&
            updatingOrderId &&
            rightLoading &&
            updatingOrderId == order._id.toString() ? (
              <Spinner />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
