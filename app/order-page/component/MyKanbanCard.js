import React, { useState } from "react";
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
import { OrderDetailsDialog } from "@/components/orders/OrderDetailsDialog";
import { useGetOrderDetails } from "@/hooks/order/useGetOrderDetails";
import { cn } from "@/lib/utils";

export function MyKanbanCard({ order, onEditOrder }) {
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

  const handlePrevStatus = (e) => {
    e.stopPropagation();
    const allStatus = ["draft", "pending", "preparing", "completed"];
    const indexOfCurrentStatus = allStatus.indexOf(order.status);
    if (indexOfCurrentStatus <= 0) return;
    const prevStatus = allStatus[indexOfCurrentStatus - 1];
    handleUpdateOrderStatus(order._id.toString(), prevStatus, "left");
  };

  const handleNextStatus = (e) => {
    e.stopPropagation();
    const allStatus = ["draft", "pending", "preparing", "completed"];
    const indexOfCurrentStatus = allStatus.indexOf(order.status);
    if (indexOfCurrentStatus >= allStatus.length - 1) return;
    const nextStatus = allStatus[indexOfCurrentStatus + 1];
    handleUpdateOrderStatus(order._id.toString(), nextStatus, "right");
  };

  const handleDeleteOrder = (e) => {
    e.stopPropagation();
    dispatch(orderActions.setSelectedDeleteOrder(order));
    dispatch(orderActions.setOpenDeleteOrder(true));
  };

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const {
    loading: detailsLoading,
    orderDetails,
    fetchOrderDetails,
  } = useGetOrderDetails();

  const handleCardClick = async (e) => {
    e.stopPropagation();
    setIsDetailsOpen(true);
    await fetchOrderDetails(order._id.toString());
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEditOrder) {
      onEditOrder(order);
    }
  };

  return (
    <>
      <Card
        className={cn(
          "w-full flex flex-col h-full cursor-pointer transition-all duration-200",
          "hover:shadow-md hover:translate-y-[-2px]",
          "border-l-4",
          {
            "border-l-yellow-500": order.status === "pending",
            "border-l-blue-500": order.status === "preparing",
            "border-l-green-500": order.status === "completed",
            "border-l-gray-500": order.status === "draft",
          }
        )}
        onClick={handleCardClick}
      >
        <CardHeader className="py-2">
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-gray-100"
                onClick={handleEditClick}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                onClick={handleDeleteOrder}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50/80 px-2.5 py-1.5 rounded-md">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">
                  Table{` ${order.tableId?.sequence} : ${order.customerId?.name}`}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {formatTime(order.createdAt)}
              </span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow py-2">
          <div className="space-y-4 h-full flex flex-col">
            <div className="flex-grow  divide-y">
              {order.dishes.map((dish) => (
                <div
                  key={dish._id}
                  className="flex justify-between items-center py-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {dish.dishId?.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-[11px] px-1.5 py-0.5"
                    >
                      ×{dish.quantity}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{(dish.dishId?.price * dish.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t mt-auto">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-full">
                  <Utensils className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{totalItems} items</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-full">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-bold">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-2">
          <div className="w-full flex justify-between gap-2">
            <Button
              variant="outline"
              onClick={handlePrevStatus}
              size="icon"
              disabled={loading || order.status === "draft"}
              className={cn("h-8 w-8 transition-colors group relative min-w-40", {
                "opacity-50 cursor-not-allowed": order.status === "draft",
                "hover:border-yellow-500 hover:text-yellow-600":
                  order.status === "preparing",
                "hover:border-blue-500 hover:text-blue-600":
                  order.status === "completed",
                "hover:border-gray-500 hover:text-gray-600":
                  order.status === "pending",
              })}
            >
              {loading &&
              updatingOrderId &&
              leftLoading &&
              updatingOrderId === order._id.toString() ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="absolute invisible group-hover:visible bg-gray-900 text-white px-2 py-1 rounded text-xs -top-8 whitespace-nowrap">
                    {order.status === "preparing" && "Move to Pending"}
                    {order.status === "completed" && "Move to Preparing"}
                    {order.status === "pending" && "Move to Draft"}
                  </span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleNextStatus}
              size="icon"
              disabled={loading || order.status === "completed"}
              className={cn("h-8 w-8 transition-colors group relative min-w-40", {
                "opacity-50 cursor-not-allowed": order.status === "completed",
                "hover:border-green-500 hover:text-green-600":
                  order.status === "preparing",
                "hover:border-blue-500 hover:text-blue-600":
                  order.status === "pending",
                "hover:border-yellow-500 hover:text-yellow-600":
                  order.status === "draft",
              })}
            >
              {loading &&
              updatingOrderId &&
              rightLoading &&
              updatingOrderId === order._id.toString() ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <>
                  <ArrowRight className="h-4 w-4" />
                  <span className="absolute invisible group-hover:visible bg-gray-900 text-white px-2 py-1 rounded text-xs -top-8 whitespace-nowrap">
                    {order.status === "draft" && "Move to Pending"}
                    {order.status === "pending" && "Move to Preparing"}
                    {order.status === "preparing" && "Move to Completed"}
                  </span>
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <OrderDetailsDialog
        open={isDetailsOpen}
        onOpenChange={(open) => setIsDetailsOpen(open)}
        orderDetails={orderDetails}
        loading={detailsLoading}
      />
    </>
  );
}
