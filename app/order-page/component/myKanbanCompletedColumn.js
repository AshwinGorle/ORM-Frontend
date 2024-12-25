import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GroupedOrderCard } from './GroupedOrderCard';
import { Utensils, CreditCard, Table } from 'lucide-react'
import { calculateMultipleOrdersTotal } from '@/utils/calculations';
import { Badge } from "@/components/ui/badge"

export function MyKanbanCompletedColumn({ title = "Completed", orders }) {
  const orderCount = orders?.length || 0;
  const totalAmount = calculateMultipleOrdersTotal(orders);
  const uniqueTables = new Set(orders?.map(order => order?.tableId?._id))?.size || 0;

  const groupedOrders = orders?.reduce((acc, order) => {
    const tableId = order?.tableId?._id;
    if (!acc[tableId]) {
      acc[tableId] = {
        orders: [],
        totalAmount: 0,
        tableSequence: order?.tableId?.sequence,
        customerName: order?.customerId?.name,
        billId: order?.billId
      };
    }
    acc[tableId].orders.push(order);
    acc[tableId].totalAmount += order?.dishes?.reduce(
      (sum, dish) => sum + ((dish?.dishId?.price || 0) * (dish?.quantity || 0)), 
      0
    ) || 0;
    return acc;
  }, {}) || {};

  return (
    <Card className="w-full h-full border-t-4 border-t-green-500 bg-green-50/30">
      <CardHeader className="pb-1 space-y-1">
        <CardTitle className="flex items-center justify-between">
          <div className="text-xl font-bold flex items-center gap-2">
            {title}
            <Badge variant="secondary" className="text-base">
              {orderCount}
            </Badge>
          </div>
        </CardTitle>
        
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-primary" />
            <span className="text-base font-bold text-gray-900">₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Table className="h-4 w-4 text-primary" />
            <span className="text-base font-bold text-gray-900">{uniqueTables} Tables</span>
          </div>
        </div>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="pt-0 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden custom-scrollbar pr-4">
        {Object.entries(groupedOrders).length > 0 ? (
          Object.entries(groupedOrders).map(([tableId, tableData]) => (
            <GroupedOrderCard
              key={tableId}
              orders={tableData.orders}
              tableSequence={tableData.tableSequence}
              customerName={tableData.customerName}
              totalAmount={tableData.totalAmount}
              billId={tableData.billId}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 bg-white/50 rounded-lg border-2 border-dashed">
            <p className="text-sm font-medium">No completed orders</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

