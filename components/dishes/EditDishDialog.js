"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useUpdateDish } from "@/hooks/dish/useUpdateDish";
import { useGetAllIngredients } from "@/hooks/ingredient/useGetAllIngredient";
import { Spinner } from "../ui/spinner";
import IngredientInput from "./component/ingredientInput";

export function EditDishDialog({ open, onOpenChange, dish, onEdit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [logo, setLogo] = useState("");

  const {loading :updateDishLoading, handleUpdateDish} = useUpdateDish(onOpenChange);
  const [selectedIngredients, setSelectedIngredients] = useState([]);


  useEffect(() => {
    if (dish) {
      setName(dish.name);
      setPrice(dish.price.toString());
      setLogo(dish.logo);
      setSelectedIngredients(dish.ingredients);
    }
  }, [dish]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientIds = selectedIngredients.map((ing)=>ing._id.toString());
    handleUpdateDish(dish._id, {name, price, logo, ingredients : ingredientIds });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Dish</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter dish name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-price">Price</Label>
            <Input
              id="edit-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price in Rupees"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-logo">Image URL</Label>
            <Input
              id="edit-logo"
              type="url"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="Enter logo URL"
              required
            />
          </div>

          <IngredientInput selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients}/>
             
            
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{updateDishLoading? <Spinner/>: "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

