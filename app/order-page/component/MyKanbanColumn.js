import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MyKanbanCard } from './MyKanbanCard';
import { Utensils, CreditCard, Table } from 'lucide-react'
import { calculateMultipleOrdersTotal } from '@/utils/calculations';
import { Badge } from "@/components/ui/badge"

export function MyKanbanColumn({ title, orders, onEditOrder }) {
  const orderCount = orders?.length;
  const totalAmount = calculateMultipleOrdersTotal(orders);
  const uniqueTables = new Set(orders?.map(order => order?.tableId?._id))?.size;

  const getColumnStyles = () => {
    switch (title.toLowerCase()) {
      case 'draft':
        return 'border-t-gray-400 bg-gray-50/50';
      case 'pending':
        return 'border-t-yellow-500 bg-yellow-50/30';
      case 'preparing':
        return 'border-t-blue-500 bg-blue-50/30';
      case 'completed':
        return 'border-t-green-500 bg-green-50/30';
      default:
        return 'border-t-primary bg-gray-50/50';
    }
  };

  return (
    <Card className={`w-full shadow-sm h-full border-t-4 ${getColumnStyles()}`}>
      <CardHeader className="pb-1 space-y-1">
        <CardTitle className="flex items-center justify-between">
          <div className="text-lg font-bold">{title}</div>
          <Badge variant="secondary" className="text-sm">
            {orderCount}
          </Badge>
        </CardTitle>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-primary" />
            <span className="text-base font-bold text-gray-900">₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Table className="h-4 w-4 text-primary" />
            
            <span className="text-base font-bold text-gray-900"> {uniqueTables} Tables</span>
          </div>
        </div>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="p-4 space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto overflow-x-hidden custom-scrollbar">
        {orders.length > 0 ? (
          orders.map((order) => (
            <MyKanbanCard key={order._id} order={order} onEditOrder={onEditOrder} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 bg-white/50 rounded-lg border-2 border-dashed">
            <p className="text-sm font-medium">No orders in {title.toLowerCase()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

