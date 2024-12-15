"use client";

import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useUpdateDish } from "@/hooks/dish/useUpdateDish";
import { useGetAllIngredients } from "@/hooks/ingredient/useGetAllIngredient";
import { Spinner } from "../ui/spinner";
import IngredientInput from "./component/SectMultiple";
import { EditableImage } from "../ImageInput.js";

export function EditDishDialog({ open, onOpenChange, dish, onEdit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [logo, setLogo] = useState("");

  const { loading: updateDishLoading, handleUpdateDish } =
    useUpdateDish(onOpenChange);
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
    const ingredientIds = selectedIngredients.map((ing) => ing._id.toString());
    handleUpdateDish(dish._id, {
      name,
      price,
      logo,
      ingredients: ingredientIds,
    });
  };

  const handleImageChange = async (file) => {
    // Simulating an upload delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log("file : ", file);
    
    // In a real application, you would upload the file to your server or a cloud storage service here
    // and get back the new URL. For this example, we're just using a local object URL.
    const newImageUrl = URL.createObjectURL(file)
    // setLogo(newImageUrl)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Dish</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-around">
            <div className="flex flex-col">
              {/* <EditableImage imageUrl={dish?.logo} /> */}
              <EditableImage
                imageUrl={dish?.logo}
                size={150}
                onImageChange={handleImageChange}
                />

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
            </div>
            <div>
              <IngredientInput
                selectedIngredients={selectedIngredients}
                setSelectedIngredients={setSelectedIngredients}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {updateDishLoading ? <Spinner /> : "Save Changes"}
                </Button>
              </DialogFooter>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
