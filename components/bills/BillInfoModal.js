"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/price";
import { Badge } from "@/components/ui/badge";

export default function BillInfoModal({ bill, open, onOpenChange }) {
  if (!bill) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Bill Information</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Information */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{bill.customerName}</h3>
              <Badge className={getStatusColor(bill.status)}>
                {bill.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDate(bill.createdAt)}
            </p>
            <p className="text-sm">
              Table: {bill.tableId.sequence}
            </p>
          </div>

          {/* Ordered Items */}
          <div>
            <h4 className="font-semibold mb-2">Ordered Items</h4>
            <div className="space-y-2">
              {bill.orderedItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center text-sm"
                >
                  <div>
                    <span className="font-medium">{item.dishId.name}</span>
                    <span className="text-muted-foreground"> × {item.quantity}</span>
                  </div>
                  <span>{formatPrice(item.dishId.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bill Summary */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span>Total Amount</span>
              <span>{formatPrice(bill.totalAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Discount</span>
              <span className="text-red-500">-{formatPrice(bill.totalDiscount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Custom Discount</span>
              <span className="text-red-500">-{formatPrice(bill.customDiscount)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Final Amount</span>
              <span>{formatPrice(bill.finalAmount)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}