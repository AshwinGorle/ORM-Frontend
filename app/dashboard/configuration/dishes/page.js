"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DishCard from "@/components/dishes/DishCard";
import { EditDishDialog } from "@/components/dishes/EditDishDialog";
import { AddDishDialog } from "@/components/dishes/AddDishDialog";
import { useGetAllDishes } from "@/hooks/dish/useGetAllDishes";
import { Spinner } from "@/components/ui/spinner";

export default function DishesPage() {
  const {dishes : myDishes , loading} = useGetAllDishes();
  console.log("my dishes ", myDishes);
  

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const handleEdit = (dish) => {
    setSelectedDish(dish);
    setIsEditDialogOpen(true);
  };


  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dishes Management</h1>
          <p className="text-muted-foreground">
            Add and manage dishes for your menu
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Dish
        </Button>
      </div>

      {loading && <Spinner/> }

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {myDishes?.map((dish) => (
          <DishCard 
            key={dish._id} 
            dish={dish} 
            onEdit={() => handleEdit(dish)}
          />
        ))}
      </div>

      <AddDishDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />

      <EditDishDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        dish={selectedDish}
      />
    </div>
  );
}