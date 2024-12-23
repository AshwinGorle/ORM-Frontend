import React, { useState } from "react";
import { MyKanbanColumn } from "./MyKanbanColumn";
import { MyKanbanCompletedColumn } from "./myKanbanCompletedColumn";
import { UpdateOrderModal } from "./UpdateOrderModel";
import { CreateOrderModel } from "./CreateOrderModel";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { DeleteOrderModal } from "./DeleteOrderModal";
import { DraftOrdersButton } from "./DraftOrdersButton";
import { orderActions } from "@/redux/slices/orderSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";


export function MyKanbanBoard({ orders, type="global", tableId, hotelName }) {
  console.log("MyKanbanBoard received orders:", orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openCreateOrderDialog, setOpenCreateOrderDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const tableOrders = {
    draft: [],
    pending: [],
    preparing: [],
    completed: [],
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center px-6 py-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-gray-100"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="h-6 w-px bg-gray-200" />
          <h2 className="text-xl font-semibold text-gray-800">
            {hotelName || "Orders"}
          </h2>
        </div>
        <Button 
          onClick={() => setOpenCreateOrderDialog(true)}
          className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <Plus className="h-4 w-4" />
          Create New Order
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full">
        <DraftOrdersButton orders={orders?.draft} />
        <MyKanbanColumn title="Pending" orders={orders?.pending} onEditOrder={handleEditOrder} />
        <MyKanbanColumn title="Preparing" orders={orders?.preparing} onEditOrder={handleEditOrder} />
        <MyKanbanCompletedColumn title="Completed" orders={orders?.completed} onEditOrder={handleEditOrder} />
        <CreateOrderModel open={openCreateOrderDialog} setOpen={setOpenCreateOrderDialog} />
         <UpdateOrderModal 
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          orderToEdit={selectedOrder}
        />
        <DeleteOrderModal />
      </div>
    </div>
  );
}
