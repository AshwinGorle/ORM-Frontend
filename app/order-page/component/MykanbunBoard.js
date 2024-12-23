import React, { useState } from "react";
import { MyKanbanColumn } from "./MyKanbanColumn";
import { MyKanbanCompletedColumn } from "./myKanbanCompletedColumn";
import { UpdateOrderModal } from "./UpdateOrderModel";
import { CreateOrderModel } from "./CreateOrderModel";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { DeleteOrderModal } from "./DeleteOrderModal";

export function MyKanbanBoard({ orders, type="global", tableId, hotelName }) {
  console.log("MyKanbanBoard received orders:", orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openCreateOrderDialog, setOpenCreateOrderDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const tableOrders = {
    draft: [],
    pending: [],
    preparing: [],
    completed: [],
  };

  if (type === "table") {
    tableOrders.draft = orders?.draft?.filter(
      (order) => order?.tableId?._id?.toString() === tableId
    );
    tableOrders.preparing = orders?.preparing?.filter(
      (order) => order?.tableId?._id?.toString() === tableId
    );
    tableOrders.pending = orders?.pending?.filter(
      (order) => order?.tableId?._id?.toString() === tableId
    );
    tableOrders.completed = orders?.completed?.filter(
      (order) => order?.tableId?._id?.toString() === tableId
    );
    orders = tableOrders;
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center px-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {hotelName || "Hotel Name"}
        </h2>
        <Button 
          onClick={() => setOpenCreateOrderDialog(true)}
          className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Order
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full">
        <MyKanbanColumn title="Draft" orders={orders?.draft} />
        <MyKanbanColumn title="Pending" orders={orders?.pending} />
        <MyKanbanColumn title="Preparing" orders={orders?.preparing} />
        <MyKanbanCompletedColumn title="Completed" orders={orders?.completed} />
        <CreateOrderModel open={openCreateOrderDialog} setOpen={setOpenCreateOrderDialog} />
        <UpdateOrderModal order={selectedOrder}/>
        <DeleteOrderModal />
      </div>
    </div>
  );
}
