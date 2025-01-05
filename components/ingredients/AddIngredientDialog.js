"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateIngredient } from "@/hooks/ingredient/useCreateIngredient";
import { Spinner } from "../ui/spinner";
import { EditableImage } from "../ImageInput";
import { useDispatch, useSelector } from "react-redux";
import { ingredientActions } from "@/redux/slices/ingredientsSlice";

export function AddIngredientDialog({ open, setOpen, onAdd }) {
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const {loading, handleCreateIngredient} = useCreateIngredient();
  const [logo, setLogo] = useState(null);
  const openCreateIngredientPopup = useSelector((state)=>state.ingredient.openCreateIngredientPopup)

  const handleSubmit = (e) => {
    e.preventDefault();
    let ingredientData = {name, description};
    if(logo) ingredientData["logo"] = logo;
    handleCreateIngredient(ingredientData, setOpen);
    // onAdd({ name, description });
    // setName("");
    // setDescription("");
  };

  const handleClose = ()=>{
    dispatch(ingredientActions.setCreateIngredientPopup(false))
  }

  return (
    <Dialog open={openCreateIngredientPopup} onOpenChange={(isOpen) => {
      if (!isOpen) handleClose();
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ingredient</DialogTitle>
        </DialogHeader>
        <EditableImage imageUrl={logo} setImageUrl={setLogo} size={200} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter ingredient name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter ingredient description"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={()=>handleClose()}>
              Cancel
            </Button>
            <Button type="submit">{loading ? <Spinner size={"sm"}/> : "Add ingredient"} </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}