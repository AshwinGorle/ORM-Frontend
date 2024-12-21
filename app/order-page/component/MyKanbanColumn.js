import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MyKanbanCard } from './MyKanbanCard';
import { Utensils, CreditCard, Table } from 'lucide-react'
import { calculateMultipleOrdersTotal } from '@/utils/calculations';

export function MyKanbanColumn({ title, orders }) {
  const orderCount = orders?.length;
  const totalAmount =  calculateMultipleOrdersTotal(orders);
  const uniqueTables = new Set(orders?.map(order => order?.tableId?._id))?.size;

  return (
    <Card className="w-full bg-gray-50/50 shadow-sm h-full">
      <CardHeader className="pb-2 space-y-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          {title}
          <span className="text-sm font-normal text-gray-500">({orderCount})</span>
        </CardTitle>
        <div className="flex justify-between items-center text-sm bg-white p-2 rounded-md">
          <div className="flex items-center gap-1 text-gray-600">
            <Utensils className="h-4 w-4" />
            <span>{orderCount} orders</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Table className="h-4 w-4" />
            <span>{uniqueTables} tables</span>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
        {orders.length > 0 ? (
          orders.map((order) => (
            <MyKanbanCard key={order._id} order={order} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No orders in {title.toLowerCase()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

