"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import BillsTable from "@/components/bills/BillsTable";
import BillInfoModal from "@/components/bills/BillInfoModal";
import { useGetAllBills } from "@/hooks/bill/useGetAllTableBills";
import { Spinner } from "@/components/ui/spinner";
import DateFilter from "@/components/bills/DateFilter";

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
  const {bills, loading : billsLoading} = useGetAllBills();
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredBills, setFilteredBills] = useState(bills);


  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handleDeleteBill = (billId) => {
    const updatedBills = bills.filter(bill => bill._id !== billId);
    setBills(updatedBills);
    setFilteredBills(updatedBills);
  };

  const handleFilterChange = ({ date, month }) => {
    let filtered = [...bills];

    if (date) {
      const selectedDate = new Date(date);
      filtered = filtered.filter(bill => {
        const billDate = new Date(bill.createdAt);
        return (
          billDate.getDate() === selectedDate.getDate() &&
          billDate.getMonth() === selectedDate.getMonth() &&
          billDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    } else if (month) {
      filtered = filtered.filter(bill => {
        const billDate = new Date(bill.createdAt);
        return billDate.getMonth() === parseInt(month) - 1;
      });
    }

    setFilteredBills(filtered);
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

      <DateFilter onFilterChange={handleFilterChange} />

       { billsLoading ? <Spinner/> : <>
      <BillsTable 
        // bills={bills}
        bills={filteredBills}
        onViewBill={handleViewBill}
        onDeleteBill={handleDeleteBill}
      />

      <BillInfoModal
        bill={selectedBill}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      </>}
    </div>
  );
}