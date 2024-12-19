import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MyKanbanCard } from './MyKanbanCard';
import { Utensils, CreditCard, Table } from 'lucide-react'

export function MyKanbanColumn({ title, orders }) {
  const orderCount = orders.length;
  const totalAmount = orders.reduce((sum, order) => 
    sum + order.dishes.reduce((dishSum, dish) => dishSum + (dish.dishId.price * dish.quantity), 0), 0
  );
  const uniqueTables = new Set(orders.map(order => order.tableId._id)).size;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <div className="flex justify-between items-center text-sm mt-2">
          <div className="flex items-center gap-1">
            <Utensils className="h-4 w-4" />
            <span>{orderCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" />
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Table className="h-4 w-4" />
            <span>{uniqueTables}</span>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {orders.length > 0 ? (
          orders.map((order) => (
            <MyKanbanCard key={order._id} order={order} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">No orders</p>
        )}
      </CardContent>
    </Card>
  );
}

