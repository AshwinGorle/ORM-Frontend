import { MyKanbanBoard } from "./MykanbunBoard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function TableOrderView({ orders, tableId, hotelName }) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Orders
        </Button>
        <h2 className="text-xl font-semibold">
          Orders for Table {tableId}
        </h2>
      </div>

      <MyKanbanBoard 
        orders={orders} 
        type="table"
        tableId={tableId}
        hotelName={hotelName}
      />
    </div>
  );
} 