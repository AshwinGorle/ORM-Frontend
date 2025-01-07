"use client";
import { useGetUser } from "@/hooks/auth";
import useAbly from "@/hooks/ably/useAbly";
import { useState, useEffect } from "react";
import { setSystemOnline, selectIsSystemOnline } from "@/redux/slices/systemSlice";
import { selectConnectionError } from "@/redux/slices/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { RotateCw, Power, Building2, ArrowLeft, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function NavBar() {
  const pendingOrderCount = useSelector((state) => state.order.pendingOrderCount);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [refresh, setRefresh] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false); // Blinking state
  const router = useRouter();

  const isSystemOnline = useSelector(selectIsSystemOnline);
  const connectionError = useSelector(selectConnectionError);
  const { user } = useGetUser();
  const { channel } = useAbly(user?.hotelId, isSystemOnline);

  // Handle system status toggle
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

  // Play beep sound on new order
  const playBeep = () => {
    const audio = new Audio(
      "https://res.cloudinary.com/dpgj9mrly/raw/upload/v1736226432/CRM/profile/OMS-Dishes/6765297893596bb4eb953cba/676a8c9c2dc2ac14e6cfb52b.mp3"
    );
    audio.play().catch((error) => console.error("Error playing audio:", error));
  };

  // Trigger blinking effect and sound on order count change
  useEffect(() => {
    if (pendingOrderCount > 0) {
      setIsBlinking(true);
      playBeep(); // Play sound for new order
      const timer = setTimeout(() => setIsBlinking(false), 1000); // Stop blinking after 1 second
      return () => clearTimeout(timer);
    }
  }, [pendingOrderCount]);

  return (
    <div className="w-full">
      <Card className="fixed top-0 left-0 w-screen bg-white shadow-none z-50 rounded-none">
        {user?.role == 'superadmin' ?  <div className="flex justify-center text-lg">Super Admin Controls</div> :
        <div className="flex items-center justify-between px-6 py-2">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2"
            >
              <LayoutDashboard/>
              <span className="font-medium">Dashboard</span>
            </Button>
            {user?.hotelName && (
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-600" />
                <span className="text-base font-medium">{user.hotelName}</span>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 ">
            {/* Order Count Indicator */}
            <Card className=" shadow-none flex items-center gap-2 px-4 py-1 border rounded-lg " >
              {/* Green/Red Dot */}
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  isBlinking ? "bg-red-500 animate-ping" : "bg-green-500"
                )}
              />
              {/* Order Count */}
              <span className="text-sm font-bold text-gray-800">
                {pendingOrderCount}
              </span>
            </Card>

            <Button
              onClick={handleSystemToggle}
              size="sm"
              variant={isSystemOnline ? "default" : "outline"}
              className={cn(
                "flex items-center gap-2",
                isSystemOnline ? "bg-green-500 text-white" : "hover:bg-gray-100"
              )}
            >
              <Power />
              <span className="text-md" >{isSystemOnline ? "Online" : "Offline"}</span>
            </Button>
          </div>
        </div>}
      </Card>

      {/* Content below the navbar */}
      <div className=" pt-[52px]">
        {connectionError && (
          <div className="p-4 bg-red-50 text-red-600">
            Connection Error: {connectionError}
          </div>
        )}
        {/* Additional content goes here */}
      </div>
    </div>
  );
}
