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
  import { useEffect, useState } from "react";

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
  import {
    ChevronLeft,
    ChevronRight,
    PanelRightClose,
    PanelRightOpen,
    RotateCw,
  } from "lucide-react";
  import { KanbanBoardShimmer } from "../component/KanbanShimmer";
  import { Alert } from "@/components/ui/alert";
  import { AlertCircle } from "lucide-react";
  import { AlertTitle, AlertDescription } from "@/components/ui/alert";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { Power } from "lucide-react";
  import { Building2, ArrowLeft, ArrowRight } from "lucide-react";
  import { useRouter } from "next/navigation";
  import { Spinner } from "@/components/ui/spinner";
  import { Card } from "@/components/ui/card";

  export default function OrderPage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [refresh, setRefresh] = useState(false);
    const router = useRouter();

    const isSystemOnline = useSelector(selectIsSystemOnline);
    const isConnected = useSelector(selectConnectionStatus);
    const connectionError = useSelector(selectConnectionError);
    const { id } = useParams();
    const { loading: ordersLoading, orders } = useGetAllOrders("order", {
      refresh,
      setRefresh,
    });
    const { loading: userLoading, user } = useGetUser();
    // const { channel } = useAbly(id, isSystemOnline);

    // const [isTableSidebarOpen, setIsTableSidebarOpen] = useState(false);
    const [isTableSidebarOpen, setIsTableSidebarOpen] = useState(() => {
      if (typeof window !== "undefined") {
        const storedState = localStorage.getItem("isTableSidebarOpen");
        return storedState === "true";
      }
      return false;
    });

    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("isTableSidebarOpen", isTableSidebarOpen);
      }
    }, [isTableSidebarOpen]);

    console.log("user", user);
    console.log("hotelName", user?.hotelName);

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

    return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <div
          className={cn(
            "flex-1 transition-all duration-300 relative",
            isTableSidebarOpen ? "mr-[320px]" : "mr-0"
          )}
        >
          <div className="flex flex-col  p-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center hover:bg-gray-100"
                  onClick={() => router.push("/dashboard")}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRefresh(true)}
                  className="flex items-center gap-2"
                >
                  {refresh ? <Spinner className="animate-spin" /> : <RotateCw />}
                  Refresh
                </Button>
                <h1 className="text-xl md:text-xl font-bold text-gray-900">
                  Order Management
                </h1>
              </div>
            </div>
            {/* Main Content */}

            <div className="bg-gray-50/50 px-10 rounded-xl">
              {ordersLoading ? (
                <KanbanBoardShimmer />
              ) : (
                <MyKanbanBoard orders={orders} hotelName={user?.hotelName} />
              )}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "fixed right-0 top-0 h-full bg-white transition-all duration-300",
            "border-l shadow-xl backdrop-blur-sm",
            isTableSidebarOpen
              ? "w-[320px] translate-x-0"
              : "w-0 translate-x-full"
          )}
        >
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
