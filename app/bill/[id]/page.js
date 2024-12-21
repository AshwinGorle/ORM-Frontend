"use client"

import { useParams } from "next/navigation";
import { useGetTableBill } from "@/hooks/bill/useGetTableBill";
import { BillCard } from "../components/BillCard";
import { Button } from "@/components/ui/button";
import { Print, Share2, Download } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function BillPage() {
  const { id } = useParams();
  const { loading, bill } = useGetTableBill(id);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-gray-900">Bill Details</h1>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Print className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        
        {bill ? (
          <BillCard bill={bill} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Bill not found</p>
          </div>
        )}
      </div>
    </div>
  );
} 