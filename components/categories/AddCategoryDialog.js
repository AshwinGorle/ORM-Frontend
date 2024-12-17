"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategory } from "@/hooks/category/useCreateCategory";
import { Spinner } from "../ui/spinner";
import { EditableImage } from "../ImageInput";

export function AddCategoryDialog({ open, onOpenChange, onAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const {loading, handleCreateCategory} = useCreateCategory(onOpenChange);
  const [logo , setLogo] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {name, description}
    if(logo) categoryData["logo"] = logo; 
    handleCreateCategory(categoryData);
    // setTimeout()
    // setName("");
    // setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <EditableImage imageUrl={logo} setImageUrl={setLogo} size={200}/>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{loading ? <Spinner size={"sm"}/>:"Add Category"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}