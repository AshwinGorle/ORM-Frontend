"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DishCard from "@/components/dishes/DishCard";
import { EditDishDialog } from "@/components/dishes/EditDishDialog";
import { AddDishDialog } from "@/components/dishes/AddDishDialog";

export default function DishesPage() {
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: "Masala Dosa",
      ingredients: ["boiled potato", "Onion", " urad dal", "Tomato", "Spices"],
      price: 110,
      image: "https://images.unsplash.com/photo-1694849789325-914b71ab4075?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Paneer Tikka",
      ingredients: ["Paneer", "Bell Peppers", "Onions", "Yogurt", "Spices"],
      price: 200,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "Dal Makhani",
      ingredients: ["Black Lentils", "Kidney Beans", "Butter", "Cream", "Spices"],
      price: 249,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60",
    },
    {
        id: 4,
        name: "Dal Chawal",
        ingredients: ["Dal", "Rice", "Aachar free", "Spices"],
        price: 249,
        image: "https://plus.unsplash.com/premium_photo-1675798917853-11d04d997979?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 5,
        name: "Bread Omlete",
        ingredients: ["egg", "breat", "spices", "sauses"],
        price: 70,
        image: "https://images.unsplash.com/photo-1527315662861-42cb0c1c4308?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b21lbGV0ZXxlbnwwfHwwfHx8MA%3D%3D",
      },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const handleEdit = (dish) => {
    setSelectedDish(dish);
    setIsEditDialogOpen(true);
  };

  const handleAddDish = (newDish) => {
    setDishes([...dishes, { id: Date.now(), ...newDish }]);
    setIsAddDialogOpen(false);
  };

  const handleUpdateDish = (updatedDish) => {
    setDishes(dishes.map((dish) => 
      dish.id === updatedDish.id ? updatedDish : dish
    ));
    setIsEditDialogOpen(false);
    setSelectedDish(null);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <DishCard 
            key={dish.id} 
            dish={dish} 
            onEdit={() => handleEdit(dish)}
          />
        ))}
      </div>

      <AddDishDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddDish}
      />

      <EditDishDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        dish={selectedDish}
        onEdit={handleUpdateDish}
      />
    </div>
  );
}