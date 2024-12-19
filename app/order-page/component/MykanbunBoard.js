import React, { useState } from "react";
import { MyKanbanColumn } from "./MyKanbanColumn";
import { MyKanbanCompletedColumn } from "./myKanbanCompletedColumn";
import { UpdateOrderModal } from "./UpdateOrderModel";
import { useSelector } from "react-redux";

export function MyKanbanBoard({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 overflow-x-auto">
      {/* <MyKanbanColumn title="Draft" orders={orders.draft} /> */}
      <MyKanbanColumn title="Pending" orders={orders.pending} />
      <MyKanbanColumn title="Preparing" orders={orders.preparing} />
      <MyKanbanCompletedColumn title="Completed" orders={orders.completed} />
      <UpdateOrderModal order={selectedOrder}/>
    </div>
  );
}
