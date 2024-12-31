"use client";

import { useEffect, useState } from "react";
import { Building2, RotateCw } from "lucide-react";
import BillsTable from "@/components/bills/BillsTable";
import BillInfoModal from "@/components/bills/BillInfoModal";
import { useGetAllBills } from "@/hooks/bill/useGetAllTableBills";
import { Spinner } from "@/components/ui/spinner";
import DateFilter from "@/components/bills/DateFilter";
import { Button } from "@/components/ui/button";

// Dummy data for testing

export default function BillsPage() {
  const [refresh, setRefresh] = useState(false);
  const { bills, loading: billsLoading } = useGetAllBills({refresh, setRefresh});
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredBills, setFilteredBills] = useState(bills);

  useEffect(() => {
    if (bills) setFilteredBills(bills);
  }, [bills]);

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handleDeleteBill = (billId) => {
    const updatedBills = bills.filter((bill) => bill._id !== billId);
    setBills(updatedBills);
    setFilteredBills(updatedBills);
  };

  const handleFilterChange = ({ date, month }) => {
    let filtered = [...bills];

    if (date) {
      const selectedDate = new Date(date);
      filtered = filtered.filter((bill) => {
        const billDate = new Date(bill.createdAt);
        return (
          billDate.getDate() === selectedDate.getDate() &&
          billDate.getMonth() === selectedDate.getMonth() &&
          billDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    } else if (month) {
      filtered = filtered.filter((bill) => {
        const billDate = new Date(bill.createdAt);
        return billDate.getMonth() === parseInt(month) - 1;
      });
    }

    setFilteredBills(filtered);
  };

  return (
    <div className="lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Bills</h1>
          <p className="text-muted-foreground">
            Manage and view all bill information
          </p>
        </div>
        <Building2 className="h-8 w-8 text-primary" />
      </div>
      <div>
        <div className="flex gap-2 justify-between">
      <DateFilter onFilterChange={handleFilterChange} />
      <Button  variant="default" onClick={() => setRefresh(true)}>
          {refresh ? <Spinner className="animate-spin" /> : "Refresh"}
          <RotateCw/>
        </Button>
        </div>
      </div>

       
      {billsLoading ? (
        <Spinner />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
