"use client"

import { useParams, useRouter } from "next/navigation";
import { useGetTableBill } from "@/hooks/bill/useGetTableBill";
import { useGetTableOrders } from "@/hooks/order/useGetTableOrders";
import { BillCard } from "../../components/BillCard";
import { BillPreview } from "../../components/BillPreview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Receipt, Check, Ban, CreditCard, Clock, ChefHat, Flag } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { TableOrderList } from "@/app/order-page/component/TableOrderList";
import { billActions } from "@/redux/actions/bill/billAction.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetUser } from "@/hooks/auth";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
          </div>
        </header>

                {!allOrdersCompleted && (
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertTitle className="text-amber-800">Orders in Progress</AlertTitle>
                        <AlertDescription className="text-amber-700">
                          All orders must be completed before generating the bill.
                        </AlertDescription>
                      </Alert>
                    )}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Order Progress</span>
                <Badge variant={allOrdersCompleted ? "success" : "warning"}>
                  {allOrdersCompleted ? "Ready for Bill" : "In Progress"}
                </Badge>
              </div>
            </div>
            
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-8 left-0 w-full h-1 bg-gray-100">
                <div 
                  className="h-full bg-green-500 transition-all duration-700 ease-in-out"
                  style={{ 
                    width: `${orders?.completed?.length > 0 
                      ? orders?.preparing?.length === 0 && orders?.pending?.length === 0 
                        ? '100%' 
                        : '66%'
                      : orders?.preparing?.length > 0 
                        ? '33%' 
                        : '0%'}`
                  }}
                />
              </div>

              <div className="flex justify-between relative z-10">
                {/* Pending Stage */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500
                      ${orders?.pending?.length === 0 
                        ? 'bg-green-50 ring-2 ring-green-500/20' 
                        : 'bg-amber-50 ring-2 ring-amber-500/20'}`}
                  >
                    <div className={`transform transition-all duration-500 ${orders?.pending?.length === 0 ? 'scale-110' : 'scale-100'}`}>
                      {orders?.pending?.length === 0 ? (
                        <Check className="h-6 w-6 text-green-600" />
                      ) : (
                        <Clock className="h-6 w-6 text-amber-600" />
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="block font-medium">Pending</span>
                    <span className={`text-sm ${orders?.pending?.length === 0 ? 'text-green-600' : 'text-amber-600'}`}>
                      {orders?.pending?.length || 0} orders
                    </span>
                  </div>
                </div>

                {/* Preparing Stage */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500
                      ${orders?.preparing?.length === 0 && orders?.pending?.length === 0
                        ? 'bg-green-50 ring-2 ring-green-500/20'
                        : orders?.preparing?.length > 0 
                          ? 'bg-blue-50 ring-2 ring-blue-500/20'
                          : 'bg-gray-50 ring-2 ring-gray-200'}`}
                  >
                    <div className={`transform transition-all duration-500 
                      ${orders?.preparing?.length === 0 && orders?.pending?.length === 0 ? 'scale-110' : 'scale-100'}`}>
                      {orders?.preparing?.length === 0 && orders?.pending?.length === 0 ? (
                        <Check className="h-6 w-6 text-green-600" />
                      ) : (
                        <ChefHat className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="block font-medium">Preparing</span>
                    <span className={`text-sm ${
                      orders?.preparing?.length > 0 ? 'text-blue-600' : 
                      orders?.preparing?.length === 0 && orders?.pending?.length === 0 ? 'text-green-600' : 
                      'text-gray-500'}`}>
                      {orders?.preparing?.length || 0} orders
                    </span>
                  </div>
                </div>

                {/* Completed Stage */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500
                      ${allOrdersCompleted 
                        ? 'bg-green-50 ring-2 ring-green-500/20' 
                        : 'bg-gray-50 ring-2 ring-gray-200'}`}
                  >
                    <div className={`transform transition-all duration-500 ${allOrdersCompleted ? 'scale-110' : 'scale-100'}`}>
                      {allOrdersCompleted ? (
                        <Check className="h-6 w-6 text-green-600" />
                      ) : (
                        <Flag className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="block font-medium">Completed</span>
                    <span className={`text-sm ${allOrdersCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {orders?.completed?.length || 0} orders
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Active Orders</h2>
                  <Badge variant="secondary" className="px-3">
                    {orders?.pending?.length + orders?.preparing?.length || 0} Active
                  </Badge>
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <TableOrderList orders={orders} tableId={id} />
                </div>
              </div>

              <div className="space-y-4">
                <BillPreview 
                  // tentativeAmount={tentativeAmount}
                  orders={orders}
                />
                {/* <HoverCard>
                  <HoverCardTrigger>
                    <div className="text-lg font-semibold">
                      Total: ₹{tentativeAmount || 0}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">Bill Summary</h4>
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span>Items Total</span>
                          <span>₹{tentativeAmount || 0}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Tax (5%)</span>
                          <span>₹{(tentativeAmount * 0.05).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Service Charge (10%)</span>
                          <span>₹{(tentativeAmount * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="mt-2 pt-2 border-t flex justify-between font-medium">
                          <span>Grand Total</span>
                          <span>₹{(tentativeAmount * 1.15).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard> */}
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
