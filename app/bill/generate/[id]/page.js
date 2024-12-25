"use client";

import { useGetTableBill } from "@/hooks/bill/useGetTableBill";
import MyBillCard from "../../components/MyBillCard";
import { useParams } from "next/navigation";
import BillEditor from "../../components/BillEditor";
import BillShimmer from "../../components/BillShimmer";

const BillPage = () => {
  // const router = useRouter();
  const { id } = useParams();
  // const { user } = useGetUser();
  const { loading : billLoading, bill } = useGetTableBill(id);
  return (
    <>
      {billLoading || !bill ? <BillShimmer/> : (
        <div className="flex h-screen">
          <div className="  w-3/5 p-4 overflow-auto self-center">
            <MyBillCard bill={bill} />
          </div>
          <div className=" w-2/5 border-l">
            <BillEditor bill={bill} />
          </div>
        </div>
      )}
    </>
  );
};

export default BillPage;
