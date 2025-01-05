import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MyKanbanOrderCard } from './MyKanbanOrderCard';
import { Utensils, User, Table, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function GroupedOrderCard({ orders, tableSequence, customerName, totalAmount, billId }) {
  const router = useRouter();
  const orderCount = orders.length;

  const handleBillClick = () => {
    if (billId) {
      router.push(`/bill/${billId}`);
    } else {
      router.push(`/bill/table/${orders[0].tableId._id.toString()}`);
    }
  };

  return (
    <Card className="w-full max-w-sm mb-4 overflow-hidden hover:shadow-lg transition-all duration-300 border-2">
      <CardHeader className="pb-2 bg-gray-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className=" bg-primary/10 rounded-lg shrink-0">
              <Table className="h-5 w-5 text-primary" />
            </div>
            {/* <div className="min-w-0">
              <CardTitle className="text-lg font-bold truncate">Table {tableSequence}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1 min-w-0">
                <User className="h-4 w-4 shrink-0" />
                <span className="truncate">{customerName}</span>
              </div>
            </div> */}

            <div className="flex items-center gap-2 bg-gray-50/80 px-2.5 py-1.5 rounded-md">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">
                              Table{` ${tableSequence} : ${customerName}`}
                            </span>
                          </div>

          </div>
          <Badge variant="secondary" className="h-7 shrink-0">
            {orderCount} orders
          </Badge>
        </div>

        <div className="flex flex-col flex-wrap sm:flex-row gap-0 sm:items-center sm:justify-between mt-4 bg-white p-2 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="p-1.5 hidden lg:inline bg-primary/10 rounded-full ">
              <Utensils className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg font-bold">₹{totalAmount.toFixed(2)}</span>
          </div>
          <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={billId ? "outline" : "default"} 
            onClick={handleBillClick}
            className={`
              gap-1 p-1.5 
              md:flex 
              ${billId ? 'hover:bg-green-50 hover:text-green-600' : 'bg-green-600 hover:bg-green-700'}
              w-10 h-10 rounded-full p-0 justify-center items-center
              md:w-auto md:h-auto md:rounded-md md:p-1.5
            `}
          >
            <Receipt className="h-5 w-5 lg:h-4 lg:w-4" />
            <span className="text-wrap text-sm hidden lg:inline">
              {billId ? "View Bill" : "Generate Bill"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="lg:hidden">
          <p>{billId ? "View Bill" : "Generate Bill"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-3 space-y-2 max-h-[300px] overflow-y-auto overflow-x-hidden custom-scrollbar bg-gray-50/30">
        {orders.map((order) => (
          <MyKanbanOrderCard key={order._id} order={order} />
        ))}
      </CardContent>
    </Card>
  );
}
