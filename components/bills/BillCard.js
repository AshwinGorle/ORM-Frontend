"use client";

import { Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/price";

export default function BillCard({ bill, onViewClick, onDeleteClick }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'unpaid':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{bill.customerName}</h3>
            <p className="text-sm text-muted-foreground">{formatDate(bill.createdAt)}</p>
          </div>
          <Badge className={getStatusColor(bill.status)}>
            {bill.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Amount</p>
            <p className="font-medium">{formatPrice(bill.finalAmount)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Items</p>
            <p className="font-medium">
              {bill.orderedItems.reduce((total, item) => total + item.quantity, 0)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Discount</p>
            <p className="font-medium">{formatPrice(bill.totalDiscount)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Custom Discount</p>
            <p className="font-medium">{formatPrice(bill.customDiscount)}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewClick}
          >
            <Info className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeleteClick}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}