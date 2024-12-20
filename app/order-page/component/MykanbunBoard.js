import React, { useState } from "react";
import { MyKanbanColumn } from "./MyKanbanColumn";
import { MyKanbanCompletedColumn } from "./myKanbanCompletedColumn";
import { UpdateOrderModal } from "./UpdateOrderModel";
import { CreateOrderModel } from "./CreateOrderModel";
import { Button } from "@/components/ui/button";

export function MyKanbanBoard({ orders, type = "global", tableId }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openCreateOrderDialog, setOpenCreateOrderDialog] = useState(false);
  const tableOrders = {
    draft: [],
    pending: [],
    preparing: [],
    completed: [],
  };

  if (type == "table") {
    tableOrders.draft = orders.draft.filter(
      (order) => order.tableId._id.toString() == tableId
    );
    tableOrders.preparing = orders.preparing.filter(
      (order) => order.tableId._id.toString() == tableId
    );
    tableOrders.pending = orders.pending.filter(
      (order) => order.tableId._id.toString() == tableId
    );
    tableOrders.completed = orders.completed.filter(
      (order) => order.tableId._id.toString() == tableId
    );
    orders = tableOrders;
  }

  return (
    <div>
      <Button onClick={() => setOpenCreateOrderDialog(true)}>
        {" "}
        Create Order{" "}
      </Button>
      <div className="flex flex-col md:flex-row gap-6 p-6 overflow-x-auto">
        {/* <MyKanbanColumn title="Draft" orders={orders.draft} /> */}
        <MyKanbanColumn title="Pending" orders={orders.pending} />
        <MyKanbanColumn title="Preparing" orders={orders.preparing} />
        <MyKanbanCompletedColumn title="Completed" orders={orders.completed} />
        <UpdateOrderModal order={selectedOrder} />
        <CreateOrderModel
          open={openCreateOrderDialog}
          setOpen={setOpenCreateOrderDialog}
        />
      </div>
    </div>
  );
}
