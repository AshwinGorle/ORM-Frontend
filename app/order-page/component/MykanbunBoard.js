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
    <div className="w-full">
      <DraftOrdersButton orders={orders?.draft}  />
      
      <Button 
        onClick={() => setOpenCreateOrderDialog(true)}
        className="fixed bottom-6 left-6 h-16 w-16 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-all duration-200"
      >
        <Plus className="h-4 w-4" />
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full">
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
