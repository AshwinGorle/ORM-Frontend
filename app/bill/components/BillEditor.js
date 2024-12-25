"use client";
import { useState } from "react";
import { RefreshCw, DollarSign, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Minus, X } from "lucide-react";
import SelectMultipleDishesForOrder from "@/components/orders/component/SelectMultipleDishesForOrder";
import DisplayMultipleDishesForOrder from "@/components/orders/component/DisplayultipleDishesForOrder";
import { useEffect } from "react";
import { useUpdateBill } from "@/hooks/bill/useUpdateBiIl";
import { Spinner } from "@/components/ui/spinner";
import { usePayBill } from "@/hooks/bill/usePayBiIl";
import { toast } from "@/hooks/use-toast";
import { Description } from "@radix-ui/react-dialog";
import { useGetUser } from "@/hooks/auth";
import { useRouter } from "next/navigation";

useEffect;

const BillEditor = ({ bill }) => {
  const [editedBill, setEditedBill] = useState(bill);
  const [customDiscount, setCustomDiscount] = useState(0);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const { loading: updateBillLoading, handleUpdateBill } = useUpdateBill();
  const { loading: payBillLoading, handlePayBill } = usePayBill();
  const {loading : userLoading , user} = useGetUser();
  const router = useRouter();

  useEffect(() => {
    // extracting already exists dishes from bill and converting them to the DishSelector formate
    const formattedSelectedDish = bill?.orderedItems?.map((billDish) => {
      return { ...billDish?.dishId, orderQuantity: billDish?.quantity || 0 };
    });
    setSelectedDishes(formattedSelectedDish);
    setCustomerName(bill.customerName);
  }, []);

  const handleUpdateBillLocal = () => {
    console.log("custom discount : ", customDiscount);
    console.log("customer name : ", customerName);
    console.log("selected dishes : ", selectedDishes);
    handleUpdateBill(bill._id, { customerName, customDiscount });
  };

  const handlePayBillLocal = () => {
    if (bill.status == "paid") {
      toast({
        title: "Bill details",
        description: "Bill is already paid",
        variant: "destructive",
      });
    } else {
      handlePayBill(bill._id);
    }
  };

  const handleCancelBill = ()=>{
      if(user.hotelId) router.push(`/order-page/${user.hotelId}`);
  }

  return (
    <Card className="h-screen overflow-auto">
      <CardHeader>
        <CardTitle>Edit Bill</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="customDiscount">Custom Discount (₹)</Label>
          <Input
            id="customDiscount"
            type="number"
            value={customDiscount}
            onChange={(e) => setCustomDiscount(Number(e.target.value))}
          />
        </div>
        <div className=" flex gap-4">
          <div>
            <Label>Add Items</Label>
            <SelectMultipleDishesForOrder
              selectedInputs={selectedDishes}
              setSelectedInputs={setSelectedDishes}
              usedPlace={"billEditor"}
            />
          </div>

          <div>
            <Label>Remove Items</Label>
            <DisplayMultipleDishesForOrder
              selectedInputs={selectedDishes}
              setSelectedInputs={setSelectedDishes}
              usedPlace={"billEditor"}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
          <div className=" flex flex-col gap-2 w-full">
            <Button
              onClick={handleUpdateBillLocal}
              variant="default"
              className="w-full"
            >
              {updateBillLoading ? (
                <Spinner />
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {/* Icon for Update Bill */}
                  Update Bill
                </>
              )}
            </Button>
            <Button
              onClick={handlePayBillLocal}
              variant="default"
              className="w-full bg-green-700 text-white hover:bg-green-800"
            >
              {payBillLoading ? (
                <Spinner />
              ) : (
                <>
                  <DollarSign className="mr-2 h-4 w-4" />
                  {/* Icon for Pay Bill */}
                  Pay Bill
                </>
              )}
            </Button>
            <Button
              onClick={handleCancelBill}
              variant="default"
              className="w-full bg-red-700 text-white hover:bg-red-800"
            >
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  {/* Icon for Cancel Bill */}
                  Cancel Bill
                </>
            </Button>
          </div>
        
      </CardFooter>
    </Card>
  );
};

export default BillEditor;
