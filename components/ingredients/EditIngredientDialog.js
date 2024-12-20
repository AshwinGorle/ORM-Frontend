"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateIngredient } from "@/hooks/ingredient/useUpdateIngredient";
import { Spinner } from "../ui/spinner";
import { EditableImage } from "../ImageInput";

export function EditIngredientDialog({ open, onOpenChange, ingredient }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");  
  const {loading, handleUpdateIngredient} = useUpdateIngredient(onOpenChange);
  const [logo, setLogo] = useState(null);


  useEffect(() => {
    if (ingredient) {
      setName(ingredient?.name);
      setDescription(ingredient?.description);
      setLogo(ingredient?.logo);
    }
  }, [ingredient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let ingredientData = {name, description};
    if(logo) ingredientData["logo"] = logo;
    handleUpdateIngredient(ingredient._id,ingredientData);
    // onEdit({ ...ingredient, name, description });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Ingredient</DialogTitle>
        </DialogHeader>
        <EditableImage imageUrl={logo} setImageUrl={setLogo} size={200} element={ingredient} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter ingredient name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter ingredient description"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{loading? <Spinner/> : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}