"use client";

import { useState } from "react";
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
import { useCreateDish } from "@/hooks/dish/useCreateDish";
import { Spinner } from "../ui/spinner";
import SelectMultiple from "./component/SectMultiple";
import SelectOne from "./component/SelectOne";
import { EditableImage } from "../ImageInput";
import { Switch } from "@/components/ui/switch"; // Import Switch for toggle buttons
import { toast } from "@/hooks/use-toast";

export function AddDishDialog({ open, onOpenChange }) {
  // Initial states
  const initialState = {
    name: "",
    price: "",
    logo: "",
    selectedIngredients: [],
    selectedCategory: "",
    selectedOffer: "",
    bestSeller: false,
    outOfStock: false,
  };

  // State management
  const [name, setName] = useState(initialState.name);
  const [price, setPrice] = useState(initialState.price);
  const [logo, setLogo] = useState(initialState.logo);
  const [selectedIngredients, setSelectedIngredients] = useState(
    initialState.selectedIngredients
  );
  const [selectedCategory, setSelectedCategory] = useState(
    initialState.selectedCategory
  );
  const [selectedOffer, setSelectedOffer] = useState(initialState.selectedOffer);
  const [bestSeller, setBestSeller] = useState(initialState.bestSeller);
  const [outOfStock, setOutOfStock] = useState(initialState.outOfStock);

  const { loading, handleCreateDish } = useCreateDish(onOpenChange);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit called!")
    // e.preventDefault();
    const ingredientIds = selectedIngredients.map(
      (ingredient) => ingredient._id
    );
    const categoryId = selectedCategory?._id?.toString() || null;
    const offerId = selectedOffer?._id?.toString() || null;

    if(!categoryId){
      toast({
        tittle : "Client Error",
        variant : "destructive",
        description : "Category is Required to create dish"
      })
      return;
    }

    handleCreateDish({
      name,
      price,
      logo: logo || null,
      ingredients: ingredientIds,
      offer: offerId,
      category: categoryId,
      bestSeller,
      outOfStock,
    });
  };

  // Handle reset
  const handleReset = (e) => {
    e.preventDefault();
    setName(initialState.name);
    setPrice(initialState.price);
    setLogo(initialState.logo);
    setSelectedIngredients(initialState.selectedIngredients);
    setSelectedCategory(initialState.selectedCategory);
    setSelectedOffer(initialState.selectedOffer);
    setBestSeller(initialState.bestSeller);
    setOutOfStock(initialState.outOfStock);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Dish</DialogTitle>
        </DialogHeader>

        <div className="flex gap-5">
          <form className="space-y-4">
            <EditableImage imageUrl={logo} setImageUrl={setLogo} size={200} />
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter dish name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price in Rupees"
                required
              />
            </div>

            {/* Best Seller Toggle */}
            <div className="flex items-center justify-between">
              <Label>Best Seller</Label>
              <Switch
                checked={bestSeller}
                onCheckedChange={(value) => setBestSeller(value)}
              />
            </div>

            {/* Out of Stock Toggle */}
            <div className="flex items-center justify-between">
              <Label>Out of Stock</Label>
              <Switch
                checked={outOfStock}
                onCheckedChange={(value) => setOutOfStock(value)}
              />
            </div>

            <DialogFooter>
              {/* Reset Button */}
              <Button variant="outline" type="button" onClick={handleReset}>
                Reset
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={(e)=>handleSubmit(e)}>
                {loading ? <Spinner /> : "Add Dish"}
              </Button>
            </DialogFooter>
          </form>

          <div className="flex flex-col gap-4">
            <SelectMultiple
              selectedInputs={selectedIngredients}
              setSelectedInputs={setSelectedIngredients}
              type={"ingredient"}
            />

            <SelectOne
              selectedInput={selectedCategory}
              setSelectedInput={setSelectedCategory}
              type={"category"}
            />

            <SelectOne
              selectedInput={selectedOffer}
              setSelectedInput={setSelectedOffer}
              type={"offer"}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
