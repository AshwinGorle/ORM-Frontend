import { Card } from "@/components/ui/card";
import { MyKanbanCard } from "./MyKanbanCard";

export const TableOrderList = ({ orders, tableId }) => {
  const tableOrders = {
    draft: [],
    pending: [],
    preparing: [],
    completed: [],
  };

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

  return (
    <Card className="flex gap-4" >
      {tableOrders.draft?.map((order) => (
        <MyKanbanCard order={order} />
      ))}
      {tableOrders.pending?.map((order) => (
        <MyKanbanCard order={order} />
      ))}
      {tableOrders.preparing?.map((order) => (
        <MyKanbanCard order={order} />
      ))}
      {tableOrders.completed?.map((order) => (
        <MyKanbanCard order={order} />
      ))}
    </Card>
  );
};
