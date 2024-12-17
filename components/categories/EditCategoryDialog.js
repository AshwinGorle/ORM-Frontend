"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCategory } from "@/hooks/category/useUpdateCategory";
import { Spinner } from "../ui/spinner";
import { EditableImage } from "../ImageInput";

export function EditCategoryDialog({ open, onOpenChange, category }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const {loading, handleUpdateCategory} = useUpdateCategory(onOpenChange)
  const [logo, setLogo] = useState(null)

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setLogo(category.logo);  
    }
  },[category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {name, description}
    if(logo) categoryData["logo"] = logo; 
    handleUpdateCategory(category._id, categoryData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <EditableImage imageUrl={logo} setImageUrl={setLogo} size={200} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
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
            <Button type="submit">{loading ? <Spinner size={"sm"}/> : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}