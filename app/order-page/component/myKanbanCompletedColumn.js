import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GroupedOrderCard } from './GroupedOrderCard';
import { Utensils, CreditCard, Table } from 'lucide-react'

export function MyKanbanCompletedColumn({ title="Completed", orders }) {
  const orderCount = orders.length;
  const totalAmount = orders.reduce((sum, order) => 
    sum + order.dishes.reduce((dishSum, dish) => dishSum + (dish.dishId.price * dish.quantity), 0), 0
  );
  const uniqueTables = new Set(orders.map(order => order.tableId._id)).size;

  // Group orders by tableId and calculate table totals
  const groupedOrders = orders.reduce((acc, order) => {
    const tableId = order.tableId._id;
    if (!acc[tableId]) {
      acc[tableId] = {
        orders: [],
        totalAmount: 0,
        tableSequence: order.tableId.sequence,
        customerName: order.customerId.name,
        billId: order.billId
      };
    }
    acc[tableId].orders.push(order);
    acc[tableId].totalAmount += order.dishes.reduce(
      (sum, dish) => sum + (dish.dishId.price * dish.quantity), 
      0
    );
    return acc;
  }, {});

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <div className="flex justify-between items-center text-sm mt-2">
          <div className="flex items-center gap-1">
            <Utensils className="h-4 w-4" />
            <span>{orderCount} orders</span>
          </div>
          <div className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" />
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Table className="h-4 w-4" />
            <span>{uniqueTables} tables</span>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
        {Object.entries(groupedOrders).map(([tableId, tableData]) => (
          <GroupedOrderCard
            key={tableId}
            orders={tableData.orders}
            tableSequence={tableData.tableSequence}
            customerName={tableData.customerName}
            totalAmount={tableData.totalAmount}
            billId={tableData.billId}
          />
        ))}
      </CardContent>
    </Card>
  );
}

