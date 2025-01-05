// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { useDispatch, useSelector } from "react-redux";
// import { Spinner } from "@/components/ui/spinner";
// import SelectMultipleDishesForOrder from "@/components/orders/component/SelectMultipleDishesForOrder";
// import DisplayMultipleDishesForOrder from "@/components/orders/component/DisplayultipleDishesForOrder";
// import { useCreateOrder } from "@/hooks/order/useCreateOrder";
// import TableSelector from "./TableSelector";

// export function CreateOrderModel({ open, setOpen }) {
//   const [selectedDishes, setSelectedDishes] = useState([]);
//   const [note, setNote] = useState("");
//   const [status, setStatus] = useState("draft");
//   const [customerName, setCustomerName] = useState("Customer");
//   const [tableId, setTableId] = useState("");
  
 

//   const handleClose = ()=>{
//        console.log("Close create order dialog");
//        setNote("");
//        setTableId("");
//        setCustomerName("");
//        setSelectedDishes([]);
//        setOpen(false);
//   }
//   const { loading: createLoading, handleCreateOrder } = useCreateOrder(handleClose);

//   const handleSubmit = () => {
//     const selectedDishesInApiFormat = selectedDishes.map((dish) => ({
//       dishId: dish._id,
//       quantity: dish.orderQuantity,
//       note: dish.note || "",
//     }));
//     console.log("selectedDishesInApiFormat : " , selectedDishesInApiFormat)
//     handleCreateOrder({
//       dishes: selectedDishesInApiFormat,
//       customerName,
//       note,
//       status,
//       tableId,
//     });
//   };



//   return (
//     <Dialog open={open} onOpenChange={()=>handleClose()}>
//       <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader className="border-b pb-4">
//           <DialogTitle className="text-2xl font-bold">Create New Order</DialogTitle>
//         </DialogHeader>

//         <div className="grid grid-cols-2 gap-6 py-6">
//           {/* Left Column */}
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               {/* Customer Name Field */}
//               <div className="space-y-2">
//                 <Label htmlFor="customerName">Customer Name</Label>
//                 <Input
//                   id="customerName"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   placeholder="Enter customer name"
//                   className="w-full"
//                 />
//               </div>

//               {/* Table Selection */}
//               <div className="space-y-2">
//                 <Label htmlFor="tableId">Table</Label>
//                 <TableSelector
//                   selectedTable={tableId}
//                   setSelectedTable={setTableId}
//                 />
//               </div>
//             </div>

//             {/* Notes Field */}
//             <div className="space-y-2">
//               <Label htmlFor="note">Notes</Label>
//               <Input
//                 id="note"
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//                 placeholder="Add any special instructions"
//                 className="w-full"
//               />
//             </div>

//             {/* Status Selection */}
//             <div className="space-y-2">
//               <Label htmlFor="status">Status</Label>
//               <Select value={status} onValueChange={setStatus}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="draft">Draft</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="preparing">Preparing</SelectItem>
//                   <SelectItem value="completed">Completed</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Right Column - Dish Selection */}
//           <div className="space-y-4">
//             <SelectMultipleDishesForOrder
//               selectedInputs={selectedDishes}
//               setSelectedInputs={setSelectedDishes}
//               usedPlace={'createOrder'}
//             />
//             <DisplayMultipleDishesForOrder
//               selectedInputs={selectedDishes}
//               setSelectedInputs={setSelectedDishes}
//             />
//           </div>
//         </div>

//         <DialogFooter className="border-t pt-4">
//           <Button variant="outline" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleSubmit}
//             className="bg-primary hover:bg-primary/90"
//             disabled={createLoading || !selectedDishes.length}
//           >
//             {createLoading ? <Spinner className="mr-2" /> : null}
//             {createLoading ? "Creating..." : "Create Order"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// here i have fixed the layout for mobile

'use client'
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
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("draft");
  const [customerName, setCustomerName] = useState("Customer");
  const [tableId, setTableId] = useState("");

  const handleClose = () => {
    console.log("Close create order dialog");
    setNote("");
    setTableId("");
    setCustomerName("");
    setSelectedDishes([]);
    setOpen(false);
  };

  const { loading: createLoading, handleCreateOrder } = useCreateOrder(handleClose);

  const handleSubmit = () => {
    const selectedDishesInApiFormat = selectedDishes.map((dish) => ({
      dishId: dish._id,
      quantity: dish.orderQuantity,
      note: dish.note || "",
    }));
    console.log("selectedDishesInApiFormat : ", selectedDishesInApiFormat);
    handleCreateOrder({
      dishes: selectedDishesInApiFormat,
      customerName,
      note,
      status,
      tableId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogContent className="sm:max-w-[800px] max-w-[100%] max-h-[90vh] overflow-y-auto px-4">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold">Create New Order</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer Name Field */}
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="w-full"
                />
              </div>

              {/* Table Selection */}
              <div className="space-y-2">
                <Label htmlFor="tableId">Table</Label>
                <TableSelector selectedTable={tableId} setSelectedTable={setTableId} />
              </div>
            </div>

            {/* Notes Field */}
            <div className="space-y-2">
              <Label htmlFor="note">Notes</Label>
              <Input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any special instructions"
                className="w-full"
              />
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
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
          </div>

          {/* Right Column - Dish Selection */}
          <div className="space-y-4">
            <SelectMultipleDishesForOrder
              selectedInputs={selectedDishes}
              setSelectedInputs={setSelectedDishes}
              usedPlace={"createOrder"}
            />
            <DisplayMultipleDishesForOrder
              selectedInputs={selectedDishes}
              setSelectedInputs={setSelectedDishes}
            />
          </div>
        </div>

        <DialogFooter className="border-t pt-4 flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
            disabled={createLoading || !selectedDishes.length}
          >
            {createLoading ? <Spinner className="mr-2" /> : null}
            {createLoading ? "Creating..." : "Create Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
