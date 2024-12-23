"use client";
import { useGetAllOrders } from "@/hooks/order/useGetAllOrders";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setSystemOnline, selectIsSystemOnline } from "../../redux/slices/systemSlice";
// import {
//   moveOrderToInProgress,
//   moveOrderToCompleted,
//   selectOrders,
//   syncOrders
// } from "@/redux/slices/orderSlice";
// import { useToast } from "@/hooks/use-toast";
// import useAbly from "../../hooks/ably/useAbly";
// import KanbanColumn from "../../components/KanbanColumn";
// import { selectConnectionStatus, selectConnectionError } from "../../redux/slices/connectionSlice";
import { MyKanbanBoard } from "../component/MykanbunBoard";
import { useGetUser } from "@/hooks/auth";
import useAbly from "@/hooks/ably/useAbly";
import { useState } from "react";

import {
  setSystemOnline,
  selectIsSystemOnline,
} from "../../../redux/slices/systemSlice";
import {
  selectConnectionError,
  selectConnectionStatus,
} from "@/redux/slices/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrderDetails } from "@/hooks/order/useGetOrderDetails";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { UpdateOrderModal } from "../component/UpdateOrderModel";
import { TableStatusSidebar } from "../component/TableStatusSidebar";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, PanelRightClose, PanelRightOpen } from "lucide-react";
import { KanbanBoardShimmer } from "../component/KanbanShimmer";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";
import { Building2 } from 'lucide-react';

export default function OrderPage() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleSystemToggle = () => {
    const newStatus = !isSystemOnline;
    dispatch(setSystemOnline(newStatus));

    toast({
      title: newStatus ? "System Online" : "System Offline",
      description: newStatus
        ? "Now receiving new orders"
        : "Order system is now offline",
      variant: newStatus ? "success" : "default",
    });
  };

  const isSystemOnline = useSelector(selectIsSystemOnline);
  const isConnected = useSelector(selectConnectionStatus);
  const connectionError = useSelector(selectConnectionError);
  const {id} = useParams();
  const { loading: ordersLoading, orders } = useGetAllOrders();
  const { loading: userLoading, user } = useGetUser();
  const { selectedServer, toggleServer } = useGetOrderDetails();  
  // const { channel } = useAbly(user.hotelId, isSystemOnline);
  const { channel } = useAbly(id, isSystemOnline);

  const [isTableSidebarOpen, setIsTableSidebarOpen] = useState(true);

  console.log("user", user);
  console.log("hotelName", user?.hotelName);    
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className={cn(
        "flex-1 transition-all duration-300 relative",
        isTableSidebarOpen ? "mr-[320px]" : "mr-0"
      )}>
        <div className="h-full overflow-y-auto custom-scrollbar">
          <div className="flex flex-col space-y-6 p-6">
            {/* Alert Messages */}
            {connectionError && (
              <Alert variant="destructive" className="animate-in fade-in duration-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Connection Error</AlertTitle>
                <AlertDescription>{connectionError}</AlertDescription>
              </Alert>
            )}
            
            {!isConnected && !connectionError && (
              <Alert variant="warning" className="animate-in fade-in duration-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Connection Lost</AlertTitle>
                <AlertDescription>
                  Press the Power button to reconnect to the system
                </AlertDescription>
              </Alert>
            )}

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  Order Management
                </h1>
                {user?.hotelName && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="h-4 w-4" />
                    <span className="text-lg">{user.hotelName}</span>
                    <Badge variant={isSystemOnline ? "success" : "secondary"} className="text-sm ml-2">
                      {isSystemOnline ? "System Online" : "System Offline"}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={handleSystemToggle}
                  size="lg"
                  variant={isSystemOnline ? "default" : "outline"}
                  className={cn(
                    "relative group transition-all duration-300",
                    isSystemOnline 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "hover:bg-gray-100"
                  )}
                >
                  <Power className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isSystemOnline ? "scale-110" : "scale-100"
                  )} />
                  <span className="ml-2">{isSystemOnline ? "Online" : "Offline"}</span>
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-gray-50/50 rounded-xl p-6">
              {!ordersLoading ? (
                <KanbanBoardShimmer />
              ) : (
                <MyKanbanBoard 
                  orders={orders} 
                  hotelName={user?.hotelName}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={cn(
        "fixed right-0 top-0 h-full bg-white transition-all duration-300",
        "border-l shadow-xl backdrop-blur-sm",
        isTableSidebarOpen ? "w-[320px] translate-x-0" : "w-0 translate-x-full"
      )}>
        <button 
          onClick={() => setIsTableSidebarOpen(!isTableSidebarOpen)}
          className={cn(
            "absolute -left-14 top-1/2 -translate-y-1/2 bg-white border shadow-lg rounded-l-xl p-3",
            "transition-all duration-300 hover:bg-gray-50 group",
            "focus:outline-none focus:ring-2 focus:ring-primary/20"
          )}
          title={isTableSidebarOpen ? "Hide table status" : "Show table status"}
        >
          {isTableSidebarOpen ? (
            <PanelRightClose className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
          ) : (
            <PanelRightOpen className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
          )}
        </button>
        
        {isTableSidebarOpen && <TableStatusSidebar />}
      </div>
    </div>
  );
}
