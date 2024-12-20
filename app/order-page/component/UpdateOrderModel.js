import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "@/redux/slices/orderSlice";
import { Spinner } from "@/components/ui/spinner";
import SelectMultipleDishesForOrder from "@/components/orders/component/SelectMultipleDishesForOrder";
import DisplayMultipleDishesForOrder from "@/components/orders/component/DisplayultipleDishesForOrder";
import { useUpdateOrder } from "@/hooks/order/useUpdateOrder";
export function UpdateOrderModal({ setOpen }) {
  const openEditOrderDialog = useSelector(
    (state) => state.order.openEditOrderDialog
  );
  const dispatch = useDispatch();
  let order = useSelector((state) => state.order.selectedEditOrder);
  console.log("updating order ------", order);
  const dummyOrder = {
    _id: "dummy123",
    billId: "bill123",
    createdAt: "2024-12-19T10:00:00.000Z",
    customerId: { _id: "customer123", name: "John Doe" },
    dishes: [
      { dishId: { name: "Burger", price: 9.99 }, quantity: 2, _id: "dish123" },
      { dishId: { name: "Fries", price: 3.99 }, quantity: 1, _id: "dish124" },
    ],
    hotelId: { _id: "hotel123", name: "Test Hotel" },
    note: "Extra cheese on burger",
    status: "preparing",
    tableId: { _id: "table123", sequence: 3 },
    updatedAt: "2024-12-19T10:05:00.000Z",
    __v: 0,
  };

  const [selectedDishes, setSelectedDishes] = useState([]);
  const [dishes, setDishes] = useState(null);
  const {loading : updateLoading, handleUpdateOrder} = useUpdateOrder();

  const handleDishChange = (index, field, value) => {
    // let updatedSelectedDishes = selectedDishes
    if (field === "name") {
      selectedDishes[index].name = value;
    } else {
      selectedDishes[index].orderQuantity = value;
    }
    // setSelectedDishes(updatedSelectedDishes);
  };

  const handleSubmit = () => {
    // Typically, you'd call an API to update the order here
    // for updating order
    console.log("Updated order:", { ...order, dishes });
    console.log("selected dishes ", selectedDishes);
    const selectedDishesInApiFormat = selectedDishes.map((dish)=>{
        const obj = {
            dishId : dish._id,
            quantity : dish.orderQuantity,
            note : dish.note || ""
        }
        return obj;
    })
    console.log("formatted selected dishes ", selectedDishesInApiFormat);
    if(order) handleUpdateOrder(order._id, {dishes : selectedDishesInApiFormat });
  };

  useEffect(() => {
    if (order) {
      setDishes(order?.dishes);
      const dishesInOrder = order?.dishes;
      const dishesInSelectedDishFormat = dishesInOrder.map((dish) => {
        let convertedDish = { ...dish.dishId };
        convertedDish["orderQuantity"] = dish?.quantity || 0;
        return convertedDish;
      });
      setSelectedDishes(dishesInSelectedDishFormat);
    }
  }, [order]);

  if (!order) return <Spinner />;
  return (
    <Dialog
      open={openEditOrderDialog}
      onOpenChange={() => {
        dispatch(orderActions.setOpenEditOrder(false));
        dispatch(orderActions.setOpenEditOrder(null));
      }}
    >
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Update Order</DialogTitle>
        </DialogHeader>
        <ul className="grid gap-4 py-4">
          {selectedDishes?.map((dish, index) => (
            <li key={dish._id} className="grid grid-cols-2 items-center gap-2">
              <div className="">
                {dish.name}
              </div>
              <div className="">
                 {dish.orderQuantity}
              </div>
            </li>
          ))}
        </ul>
        <div className="flex gap-4">

          <SelectMultipleDishesForOrder
            selectedInputs={selectedDishes}
            setSelectedInputs={setSelectedDishes}
          />
          <DisplayMultipleDishesForOrder
            selectedInputs={selectedDishes}
            setSelectedInputs={setSelectedDishes}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {updateLoading ? <Spinner/> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
