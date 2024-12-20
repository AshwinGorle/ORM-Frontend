"use client"

import { MyKanbanBoard } from "@/app/order-page/component/MykanbunBoard";
import { Spinner } from "@/components/ui/spinner";
import { useGetTableBill } from "@/hooks/biill/useGetTableBill";
import { useGetAllOrders } from "@/hooks/order/useGetAllOrders";
import { useParams } from "next/navigation";
import { BillCard } from "../../component/BillCard";
import { OrderList, TableOrderList } from "@/app/order-page/component/TableOrderList";

const tableBillPage = () => {
  //tableId
  const { id } = useParams();
  const { loading , orders } = useGetAllOrders();
  const {loading : billLoading, tableBill} = useGetTableBill(id);
  
 

  return <div>
    {loading && <Spinner/>}
    <TableOrderList tableId={id} orders={orders} />
    {/* <MyKanbanBoard orders={orders} type="table" tableId={id}/> */}
    {tableBill && <BillCard bill={tableBill} />}
  </div>;
};

export default tableBillPage;
