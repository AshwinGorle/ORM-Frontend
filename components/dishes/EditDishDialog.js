"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function EditDishDialog({ open, onOpenChange, dish, onEdit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (dish) {
      setName(dish.name);
      setPrice(dish.price.toString());
      setImage(dish.image);
      setIngredients(dish.ingredients);
    }
  }, [dish]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...dish,
      name,
      price: parseInt(price),
      image,
      ingredients,
    });
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
            <Label htmlFor="edit-price">Price (₹)</Label>
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
            <Label htmlFor="edit-image">Image URL</Label>
            <Input
              id="edit-image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Ingredients</Label>
            <div className="flex gap-2">
              <Input
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                placeholder="Add ingredient"
              />
              <Button type="button" onClick={handleAddIngredient}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {ingredients.map((ing, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {ing}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveIngredient(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}