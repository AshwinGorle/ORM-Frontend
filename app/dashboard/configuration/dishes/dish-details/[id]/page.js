"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateDish } from "@/hooks/dish/useUpdateDish";
import { EditableImage } from "@/components/ImageInput";
import { Spinner } from "@/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";
import { useGetDish } from "@/hooks/dish/useGetDish";
import SelectMultiple from "@/components/dishes/component/SectMultiple";
import SelectOne from "@/components/dishes/component/SelectOne";
import { Switch } from "@/components/ui/switch"; // Switch for toggle buttons

function DishDetails() {
  const { id } = useParams();
  const { dish, loading } = useGetDish(id);
  const router = useRouter();

  // States
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [logo, setLogo] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [bestSeller, setBestSeller] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const { loading: updateDishLoading, handleUpdateDish } = useUpdateDish();

  // Populate states when dish data is available
  useEffect(() => {
    if (dish) {
      setName(dish?.name || "");
      setPrice(dish?.price?.toString() || "0");
      setLogo(dish?.logo || "");
      setSelectedIngredients(dish?.ingredients || []);
      setSelectedCategory(dish?.category || null);
      setSelectedOffer(dish?.offer || null);
      setBestSeller(dish?.bestSeller || false);
      setOutOfStock(dish?.outOfStock || false);
    }
  }, [dish]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientIds = selectedIngredients?.map((ing) => ing._id.toString());
    const categoryId = selectedCategory?._id?.toString();
    const offerId = selectedOffer?._id?.toString();

    handleUpdateDish(dish._id, {
      name,
      price,
      logo,
      ingredients: ingredientIds || [],
      category: categoryId || null,
      offer: offerId || null,
      bestSeller,
      outOfStock,
    });
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Edit Dish</h1>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-4 space-y-6">
          {/* Dish Image */}
          <EditableImage
            imageUrl={logo}
            size={300}
            setImageUrl={setLogo}
            element={dish}
          />

          {/* Dish Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-name">Dish Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter dish name"
              required
            />
          </div>

          {/* Dish Price */}
          <div className="space-y-2">
            <Label htmlFor="edit-price">Price (₹)</Label>
            <Input
              id="edit-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
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
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-6">
          {/* Dish Ingredients */}
          <div>
            <Label>Ingredients</Label>
            <SelectMultiple
              selectedInputs={selectedIngredients || []}
              setSelectedInputs={setSelectedIngredients}
              type="ingredient"
            />
          </div>

          {/* Dish Category */}
          <div>
            <Label>Category</Label>
            <SelectOne
              selectedInput={selectedCategory || null}
              setSelectedInput={setSelectedCategory}
              type="category"
            />
          </div>

          {/* Dish Offer */}
          <div>
            <Label>Offer</Label>
            <SelectOne
              selectedInput={selectedOffer || null}
              setSelectedInput={setSelectedOffer}
              type="offer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="col-span-12 flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/dashboard/configuration/dishes`)}
          >
            Go Back
          </Button>
          <Button type="submit">
            {updateDishLoading ? <Spinner /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DishDetails;
