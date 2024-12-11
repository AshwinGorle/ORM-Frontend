"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateIngredient } from "@/hooks/ingredient/useCreateIngredient";
import { Spinner } from "../ui/spinner";

export function AddIngredientDialog({ open, setOpen, onAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const {loading, handleCreateIngredient} = useCreateIngredient(setOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateIngredient({name, description}, setOpen);
    // onAdd({ name, description });
    // setName("");
    // setDescription("");
  };

  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ingredient</DialogTitle>
        </DialogHeader>
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{loading ? <Spinner size={"sm"}/> : "Add ingredient"} </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}