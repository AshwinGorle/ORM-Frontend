"use client"

import { useParams, useRouter } from "next/navigation";
import { useGetTableBill } from "@/hooks/bill/useGetTableBill";
import { useGetTableOrders } from "@/hooks/order/useGetTableOrders";
import { BillCard } from "../../components/BillCard";
import { BillPreview } from "../../components/BillPreview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Receipt, Check, Ban, CreditCard, Clock, ChefHat, Flag, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { TableOrderList } from "@/app/order-page/component/TableOrderList";
import { billActions } from "@/redux/actions/bill/billAction.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetUser } from "@/hooks/auth";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { DeleteOrderModal } from "@/app/order-page/component/DeleteOrderModal";

export default function TableBillPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  // const { loading: billLoading, bill, handleGenerateBill } = useGetTableBill(id);
  const { loading: ordersLoading, orders } = useGetTableOrders(id);

  const initialAllOrdersCompleted = orders?.pending?.length === 0 && 
                            orders?.preparing?.length === 0 && 
                            orders?.completed?.length > 0;

  const [allOrdersCompleted, setAllOrdersCompleted] = useState(initialAllOrdersCompleted);

  //tentative amount is the total amount of all completed orders , do not use memo here 
  const tentativeAmount = orders?.completed?.reduce((total, order) => {
    return total + order.totalAmount;
  }, 0);

  const [billGenerated, setBillGenerated] = useState(false);

  const [isProgressOpen, setIsProgressOpen] = useState(false);

  const handleBillGeneration = async () => {
    if (!allOrdersCompleted) return;
    try {
      router.push('/bill/generate/' + id);
    } catch (error) {
      console.error("Failed to generate bill:", error);
    }
  };

  const handleCancelBill = async () => {
    router.push('/bill/table/' + id);
  };
  
  //when order change the status , check if all orders are completed and if all orders are completed then update state of allOrdersCompleted
  useEffect(() => {
    if (orders?.pending?.length === 0 && orders?.preparing?.length === 0 && orders?.completed?.length > 0) {
      setAllOrdersCompleted(true);
      console.log("All orders are completed",allOrdersCompleted);
    }
    else {
      setAllOrdersCompleted(false);
      console.log("All orders are not completed",allOrdersCompleted);
    }
  }, [orders]);
  
  const {user} = useGetUser();
  
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto space-y-8 px-4">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => {
              console.log("in button click of table bill page",user);
              router.push('/order-page/'+user?.hotelId)}
            }>
              
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <h1 className="text-2xl font-bold text-gray-900">
              Table Bill
            </h1>
          
            {/* <span className="text-xs text-gray-500 font-normal"> {id}</span> */}
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white rounded-lg p-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900"> Orders</h2>
                <div className="group relative">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="20"
                            cy="20"
                            r="18"
                            strokeWidth="3"
                            stroke="#e5e7eb"
                            fill="none"
                          />
                          <circle
                            cx="20"
                            cy="20"
                            r="18"
                            strokeWidth="3"
                            stroke="#22c55e"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={113.1}
                            strokeDashoffset={113.1 - ((orders?.completed?.length || 0) / 
                              Math.max(1, (orders?.pending?.length || 0) + 
                              (orders?.preparing?.length || 0) + 
                              (orders?.completed?.length || 0)) * 113.1)}
                            className="transition-all duration-700 ease-in-out"
                          />
                        </svg>
                      </div>
                      <div className="z-10 text-sm font-medium flex items-center gap-0.5">
                        <span className="text-green-600">{orders?.completed?.length || 0}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-600">{(orders?.pending?.length || 0) + (orders?.preparing?.length || 0) + (orders?.completed?.length || 0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-2 min-w-[160px] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <div className="space-y-1.5">
                      {[
                        {
                          title: "Pending",
                          count: orders?.pending?.length || 0,
                          icon: Clock,
                          color: "amber"
                        },
                        {
                          title: "Preparing",
                          count: orders?.preparing?.length || 0,
                          icon: ChefHat,
                          color: "blue"
                        },
                        {
                          title: "Completed",
                          count: orders?.completed?.length || 0,
                          icon: Flag,
                          color: "green"
                        }
                      ].map((stage) => (
                        <div key={stage.title} className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-50 transition-colors duration-200">
                          <stage.icon className={`h-3 w-3 text-${stage.color}-600`} />
                          <span className="text-xs">{stage.title}</span>
                          <span className={`text-xs ml-auto text-${stage.color}-600 font-medium`}>
                            {stage.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="px-3">
                {orders?.pending?.length + orders?.preparing?.length || 0} Active
              </Badge>
            </div>
            
              <TableOrderList orders={orders} tableId={id} />
            
          </div>

          <div className="space-y-4">
            <BillPreview 
              // tentativeAmount={tentativeAmount}
              orders={orders}
            />
            <div className="flex justify-end mt-6">
              <Button
                size="lg"
                disabled={!allOrdersCompleted}
                onClick={handleBillGeneration}
                className={`
                  relative overflow-hidden transition-all duration-300
                  ${allOrdersCompleted 
                    ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    : "bg-gray-100 text-gray-400"
                  }
                `}
              >
                <Receipt className="h-5 w-5 mr-2" />
                Generate Final Bill
              </Button>
              </div>
              {!allOrdersCompleted && (
                  <div className="flex items-center bg-red-50 border border-red-300 text-red-600 rounded-lg p-3 gap-3 shadow-sm">
                      <div className="flex-shrink-0">
                        <Ban className="h-6 w-6 text-red-500" />
                      </div>
                     <span className=" font-medium">
                      Please complete all orders to generate the bill – a few are still pending or being prepared!
                    </span>
                </div>
              )}

            <DeleteOrderModal />
          </div>
        </section>
      
      {/* { ) : (
        <div className="max-w-4xl mx-auto">
          <BillCard bill={bill} />
          <div className="flex justify-end gap-4 mt-6">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleCancelBill}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Ban className="h-5 w-5 mr-2" />
              Cancel Bill
            </Button>
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                router.push('/payment/' + id);
              }}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Complete Payment
            </Button>
          </div>
        </div>
      )} */}

    </div>
    </div>
  );
}
