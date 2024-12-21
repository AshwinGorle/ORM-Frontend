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
  //optional chaining
  const totalAmount = order.dishes.reduce(
    (sum, dish) => sum + dish.dishId?.price * dish.quantity,
    0
  );

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePrevStatus = () => {
    const allStatus = ["draft", "pending", "preparing", "completed"];
    const indexOfCurrentStatus = allStatus.indexOf(order.status);
    if (indexOfCurrentStatus <= 0) return;
    const prevStatus = allStatus[indexOfCurrentStatus - 1];
    handleUpdateOrderStatus(order._id.toString(), prevStatus, "left");
  };

  const handleNextStatus = () => {
    const allStatus = ["draft", "pending", "preparing", "completed"];
    const indexOfCurrentStatus = allStatus.indexOf(order.status);
    if (indexOfCurrentStatus >= allStatus.length - 1) return;
    const nextStatus = allStatus[indexOfCurrentStatus + 1];
    handleUpdateOrderStatus(order._id.toString(), nextStatus, "right");
  };

  const handleEditOrder = ()=>{
    dispatch(orderActions.setSelectedEditOrder(order));
       dispatch(orderActions.setOpenEditOrder(true));
    }

  return (
    <Card className="w-full bg-white hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-base">
          <div className="flex gap-2">
            <div 
              className="bg-black p-1.5 rounded-md cursor-pointer hover:bg-gray-800 transition-colors" 
              onClick={() => handleEditOrder()}
            >
              <Pencil color="white" className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Table {order.tableId.sequence}</span>
              <Badge variant={order.status === "pending" ? "warning" : "default"}>
                {order.status}
              </Badge>
            </div>
          </div>
          <span className="text-sm text-gray-500">
            {formatTime(order.createdAt)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <User className="h-4 w-4" />
            <span>{order.customerId.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Utensils className="h-4 w-4 text-gray-500" />
              <span>{totalItems}</span>
            </div>
            <div className="font-medium">₹{totalAmount.toFixed(2)}</div>
          </div>
        </div>

        <div className="space-y-1.5">
          {order.dishes.map((dish) => (
            <div
              key={dish._id}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-gray-700">{dish.dishId?.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">×{dish.quantity}</span>
                <span className="text-gray-600">₹{(dish.dishId?.price * dish.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {order.note && (
          <div className="text-sm bg-gray-50 p-2 rounded-md">
            <span className="text-gray-500">Note: </span>
            {order.note}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="w-full flex justify-between gap-2">
          <Button
            variant="outline"
            onClick={handlePrevStatus}
            size="sm"
            disabled={loading || order.status === "draft"}
            className="w-full"
          >
            {loading && updatingOrderId && leftLoading && updatingOrderId === order._id.toString() ? (
              <Spinner />
            ) : (
              <ArrowLeft className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleNextStatus}
            size="sm"
            disabled={loading || order.status === "completed"}
            className="w-full"
          >
            {loading && updatingOrderId && rightLoading && updatingOrderId === order._id.toString() ? (
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
