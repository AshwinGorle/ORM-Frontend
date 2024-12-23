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
    <div className="flex h-screen">
      <div className={cn(
        "flex-1 p-6 overflow-y-auto transition-all duration-300",
        isTableSidebarOpen ? "max-w-[calc(100%-320px)]" : "max-w-full"
      )}>
        {connectionError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">Connection Error</p>
            <p className="text-sm">{connectionError}</p>
          </div>
        )}
        {!isConnected && !connectionError && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
            <p>
              Connection lost - Press the Power button to reconnect to the system
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>

            <div className="relative group">
              <label
                htmlFor="hotelId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Hotel ID
              </label>
              <div className="flex items-center gap-2">
                <div
                  className="w-[300px] px-4 py-2 border-2 border-gray-200 rounded-lg text-sm bg-gray-50"
                >
                  {id}
                </div>
              </div>
            </div>

            <div className="relative group">
              <label
                htmlFor="serverSelect"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                API Server
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleServer}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        selectedServer === "deployed"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                >
                  {selectedServer === "deployed"
                    ? "🌐 Deployed Server"
                    : "💻 Local Server"}
                </button>
                <div className="text-xs text-gray-500">
                  {selectedServer === "deployed"
                    ? "Using: oms-api.vercel.app"
                    : "Using: localhost:5000"}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSystemToggle}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl ${
              isConnected && isSystemOnline
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-white hover:bg-gray-100 text-gray-900"
            }`}
            title={
              isConnected && isSystemOnline ? "System Online" : "System Offline"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-6 h-6 transition-all duration-300 ${
                isConnected && isSystemOnline ? "scale-110" : "scale-100"
              }`}
            >
              <path
                d="M12 3v10m-6.4-4.5a8 8 0 1 0 12.8 0"
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {!ordersLoading  || userLoading? (
          <KanbanBoardShimmer />
        ) : (
          <MyKanbanBoard 
            orders={orders} 
            hotelName={user?.hotelName}
          />
        )}

        {/* <MyKanbanBoard 
          orders={orders} 
          hotelName={user?.hotelName}
        /> */}
      </div>

      <div className={cn(
        "fixed right-0 top-0 h-full bg-white transition-all duration-300 border-l",
        isTableSidebarOpen ? "w-[320px] translate-x-0" : "w-0 translate-x-full"
      )}>
        <button 
          onClick={() => setIsTableSidebarOpen(!isTableSidebarOpen)}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -left-12 bg-white border shadow-sm rounded-l-lg p-2 transition-all duration-300",
            isTableSidebarOpen ? "hover:bg-gray-100" : "hover:bg-gray-100"
          )}
          title={isTableSidebarOpen ? "Hide table status panel" : "Show table status panel"}
        >
          {isTableSidebarOpen ? (
            <PanelRightClose className="h-6 w-6" />
          ) : (
            <PanelRightOpen className="h-6 w-6" />
          )}
        </button>
        
        {isTableSidebarOpen && <TableStatusSidebar />}
      </div>
    </div>
  );
}
