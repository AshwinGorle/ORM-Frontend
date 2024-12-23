import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MyKanbanCard } from './MyKanbanCard';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DraftOrdersButton({ orders = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const orderCount = orders?.length || 0;

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 left-6 h-16 w-16 rounded-full shadow-lg z-50",
          "bg-gray-900 hover:bg-gray-800 transition-all duration-200",
          "flex flex-col items-center justify-center gap-1",
        )}
      >
        <FileText className="h-6 w-6" />
        {orderCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
            {orderCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 left-6 w-96 shadow-xl border-2 z-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Draft Orders</h3>
              <span className="text-sm text-gray-500">{orderCount} orders</span>
            </div>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4 pr-4">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <MyKanbanCard key={order._id} order={order} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No draft orders</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 