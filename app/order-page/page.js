"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSystemOnline, selectIsSystemOnline } from "../../redux/slices/systemSlice";
import { 
  moveOrderToInProgress, 
  moveOrderToCompleted, 
  selectOrders,
  syncOrders 
} from "@/redux/slices/orderSlice";
import { useToast } from "@/hooks/use-toast";
import useAbly from "../../hooks/ably/useAbly";
import KanbanColumn from "../../components/KanbanColumn";
import { selectConnectionStatus, selectConnectionError } from "../../redux/slices/connectionSlice";

export default function OrderPage() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const isSystemOnline = useSelector(selectIsSystemOnline);
  const isConnected = useSelector(selectConnectionStatus);
  const connectionError = useSelector(selectConnectionError);
  const orders = useSelector(selectOrders);
  const hotelId = "674cb4bdc72700e0f6dc839c";

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

  // Connect to Ably for real-time updates
  const { channel } = useAbly(hotelId, isSystemOnline);

  const handleMoveOrder = (orderId, from, to) => {
    if (from === "new" && to === "inProgress") {
      dispatch(moveOrderToInProgress(orderId));
    } else if (from === "inProgress" && to === "completed") {
      dispatch(moveOrderToCompleted(orderId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {connectionError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">Connection Error</p>
            <p className="text-sm">{connectionError}</p>
          </div>
        )}
        
        {!isConnected && !connectionError && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
            <p>Connection lost - Press the Power button to reconnect to the system</p>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <button
            onClick={handleSystemToggle}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl ${
              isConnected && isSystemOnline     
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-white hover:bg-gray-100 text-gray-900"
            }`}
            title={isConnected && isSystemOnline ? "System Online" : "System Offline"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className={`w-6 h-6 transition-all duration-300 ${
                isConnected && isSystemOnline ? 'scale-110' : 'scale-100'
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KanbanColumn
            title="New Orders"
            badgeColor="blue"
            orders={orders?.new || []}
            actions={[
              {
                label: "Move to In Progress",
                onClick: (orderId) => handleMoveOrder(orderId, "new", "inProgress")
              }
            ]}
          />

          <KanbanColumn
            title="In Progress"
            badgeColor="yellow"
            orders={orders?.inProgress || []}
            actions={[
              {
                label: "Move to Completed",
                onClick: (orderId) => handleMoveOrder(orderId, "inProgress", "completed")
              }
            ]}
          />

          <KanbanColumn
            title="Completed"
            badgeColor="green"
            orders={orders?.completed || []}
            actions={[]}
          />
        </div>
      </div>
    </div>
  );
}
