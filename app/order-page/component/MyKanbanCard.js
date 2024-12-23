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
  CreditCard,
  Trash,
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

  const handleDeleteOrder = () => {
    dispatch(orderActions.setSelectedDeleteOrder(order));
       dispatch(orderActions.setOpenDeleteOrder(true));
  }    

  return (
    <Card className="w-full mb-2 flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-base">
          <div className="flex gap-2">
            <div 
              className="bg-black p-1.5 rounded-md cursor-pointer hover:bg-gray-800 transition-colors" 
              onClick={() => handleEditOrder()}
            >
              <Pencil color="white" className="h-3.5 w-3.5" />
            </div>
            <div 
              className=" bg-gray-400 p-1.5 rounded-md cursor-pointer hover:bg-red-500 transition-colors" 
              onClick={() => handleDeleteOrder()}
            >
              <Trash color="white" className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Table {order.tableId.sequence}</span>
              {/* <Badge variant={order.status === "pending" ? "warning" : "default"}>
                {order.status}
              </Badge> */}
            </div>
          </div>
          <span className="text-sm text-gray-500">
            {formatTime(order.createdAt)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="space-y-3 h-full flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{formatTime(order.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              Table {order.tableId?.sequence}
            </div>
          </div>

          <div className="space-y-2 flex-grow">
            {order.dishes.map((dish) => (
              <div
                key={dish._id}
                className="flex justify-between items-center text-sm"
              >
                <span>{dish.dishId?.name}</span>
                <span>×{dish.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-sm pt-2 border-t mt-auto">
            <div className="flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              <span>{totalItems} items</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <CreditCard className="h-4 w-4" />
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
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
