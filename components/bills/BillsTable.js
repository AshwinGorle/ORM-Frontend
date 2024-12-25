"use client";

import { Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/price";
import DeleteBillDialog from "./DeleteBillDialog";
import { useState } from "react";
import BillCard from "./BillCard";

export default function BillsTable({ bills, onViewBill, onDeleteBill }) {
  const [billToDelete, setBillToDelete] = useState(null);

  const handleDeleteClick = (bill) => {
    setBillToDelete(bill);
  };

  const handleConfirmDelete = () => {
    if (billToDelete) {
      onDeleteBill(billToDelete._id);
      setBillToDelete(null);
    }
  };

  // Mobile view
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <div className="space-y-4">
        {bills.map((bill) => (
          <BillCard
            key={bill._id}
            bill={bill}
            onViewClick={() => onViewBill(bill)}
            onDeleteClick={() => handleDeleteClick(bill)}
          />
        ))}
        <DeleteBillDialog
          open={!!billToDelete}
          onOpenChange={() => setBillToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    );
  }

  // Desktop view
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right hidden lg:table-cell">Total Discount</TableHead>
            <TableHead className="text-right hidden lg:table-cell">Custom Discount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Items</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill._id}>
              <TableCell className="font-medium">{bill.customerName}</TableCell>
              <TableCell>{formatDate(bill.createdAt)}</TableCell>
              <TableCell className="text-right">{formatPrice(bill.finalAmount)}</TableCell>
              <TableCell className="text-right hidden lg:table-cell">{formatPrice(bill.totalDiscount)}</TableCell>
              <TableCell className="text-right hidden lg:table-cell">{formatPrice(bill.customDiscount)}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(bill.status)}>
                  {bill.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {bill.orderedItems.reduce((total, item) => total + item.quantity, 0)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewBill(bill)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(bill)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteBillDialog
        open={!!billToDelete}
        onOpenChange={() => setBillToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

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