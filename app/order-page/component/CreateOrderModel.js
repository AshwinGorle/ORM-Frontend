import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";
import SelectMultipleDishesForOrder from "@/components/orders/component/SelectMultipleDishesForOrder";
import DisplayMultipleDishesForOrder from "@/components/orders/component/DisplayultipleDishesForOrder";
import { useCreateOrder } from "@/hooks/order/useCreateOrder";
import TableSelector from "./TableSelector";

export function CreateOrderModel({ open, setOpen }) {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("draft");
  const [customerName, setCustomerName] = useState("Customer");
  const [tableId, setTableId] = useState("");
  const { loading: createLoading, handleCreateOrder } = useCreateOrder();

  const handleSubmit = () => {
    const selectedDishesInApiFormat = selectedDishes.map((dish) => ({
      dishId: dish._id,
      quantity: dish.orderQuantity,
      note: dish.note || "",
    }));
    console.log("selectedDishesInApiFormat : " , selectedDishesInApiFormat)
    handleCreateOrder({
      dishes: selectedDishesInApiFormat,
      customerName,
      notes,
      status,
      tableId,
    });
  };

  const handleClose = ()=>{
       console.log("Close create order dialog");
       setNotes("");
       setTableId("");
       setCustomerName("");
       setSelectedDishes([]);
       setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={()=>handleClose()}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
        </DialogHeader>
        <div className="gap-4 py-4 flex">
          {/* Customer Name Field */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>

          {/* Notes Field */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter any notes"
            />
          </div>

          {/* Status Dropdown */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table ID Field */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="tableId">Table ID</Label>
            <TableSelector
              selectedTable={tableId}
              setSelectedTable={setTableId}
            />
          </div>

        </div>

        {/* Dish Selection Components */}
        <div className="flex gap-4">
          <SelectMultipleDishesForOrder
            selectedInputs={selectedDishes}
            setSelectedInputs={setSelectedDishes}
            usedPlace={'createOrder'}
          />
          <DisplayMultipleDishesForOrder
            selectedInputs={selectedDishes}
            setSelectedInputs={setSelectedDishes}
          />
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {createLoading ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
