"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import BillsTable from "@/components/bills/BillsTable";
import BillInfoModal from "@/components/bills/BillInfoModal";

// Dummy data for testing
const initialBills = [
  {
    createdAt: "2024-12-25T07:42:12.141Z",
    customDiscount: 50,
    customerName: "Customer 2",
    finalAmount: 170,
    hotelId: {
      _id: "6765297893596bb4eb953cba",
      name: "Aswin Ow's Hotel"
    },
    orderedItems: [
      {
        dishId: {
          name: "Pasta",
          price: 80,
          quantity: 1,
        },
        quantity: 1,
        _id: "676bb7542673e55bb1c3d821"
      },
    ],
    status: "unpaid",
    tableId: {
      _id: "67679e95443a6b856071e384",
      sequence: 5
    },
    totalAmount: 170,
    totalDiscount: 0,
    updatedAt: "2024-12-25T07:42:12.329Z",
    _id: "676bb7542673e55bb1c3d820"
  }
];

export default function BillsPage() {
  const [bills, setBills] = useState(initialBills);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handleDeleteBill = (billId) => {
    setBills(bills.filter(bill => bill._id !== billId));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Bills</h1>
          <p className="text-muted-foreground">
            Manage and view all bill information
          </p>
        </div>
        <Building2 className="h-8 w-8 text-primary" />
      </div>

      <BillsTable 
        bills={bills}
        onViewBill={handleViewBill}
        onDeleteBill={handleDeleteBill}
      />

      <BillInfoModal
        bill={selectedBill}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}