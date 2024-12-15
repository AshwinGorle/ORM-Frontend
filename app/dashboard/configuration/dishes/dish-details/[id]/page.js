// 'use client'
// import { useGetDish } from "@/hooks/dish/useGetDish";

// const { useParams } = require("next/navigation");

//  const DishDetails = ()=>{
//     const { id } = useParams();
//     console.log("dish in component" , id)
//     const {dish, loading} = useGetDish(id);

//     return(
//         <div>{dish.name}</div>
//     )

// }

// export default  DishDetails

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
import { EditableImage } from "@/components/ImageInput";
import { Spinner } from "@/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";
import { useGetDish } from "@/hooks/dish/useGetDish";
import { defaultDishLogo } from "@/config/config";
import SelectMultiple from "@/components/dishes/component/SectMultiple";

function DishDetails() {
  const { id } = useParams();
  console.log("dish in component", id);
  const { dish, loading } = useGetDish(id);
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [logo, setLogo] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const { loading: updateDishLoading, handleUpdateDish } = useUpdateDish();

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (dish) {
      setName(dish?.name);
      setPrice(dish?.price?.toString() || "0");
      setLogo(dish?.logo);
      setSelectedIngredients(dish?.ingredients || []);
      setSelectedCategories(dish?.categories || [])
    }
  }, [dish]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientIds = selectedIngredients?.map((ing) => ing._id.toString());
    const categoryIds = selectedCategories?.map((ing) => ing._id.toString());

    // here in this handleUpdateDish function dish unction  
    handleUpdateDish(dish._id, {
      name,
      price,
      logo,
      ingredients: ingredientIds || [],
      categories : categoryIds || [],
    });
  };

  const handleImageChange = async (file) => {
    // Simulating an upload delay
    console.log("file in handle image change ", file);
    setUploadFile(file);
    const newImageUrl = URL.createObjectURL(file);
    // setLogo(newImageUrl);
  };

  // if(loading) return <Spinner></Spinner>
  return (
    <Dialog open={true}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Dish</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-around">
            <div className="flex flex-col">
              {/* <EditableImage imageUrl={dish?.logo} /> */}
              <EditableImage
                imageUrl={logo}
                size={200}
                setImageUrl={setLogo}
                element={dish}
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
              <SelectMultiple
                selectedInputs={selectedIngredients || []}
                setSelectedInputs={setSelectedIngredients}
                type={"ingredient"}
              />

              <SelectMultiple
                selectedInputs={selectedCategories || []}
                setSelectedInputs={setSelectedCategories}
                type={"category"}
              />

              <DialogFooter>
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
              </DialogFooter>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DishDetails;
