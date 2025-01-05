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
import { categoryActions } from "@/redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { WhiteLoadingSpinner } from "../ui/WhiteLoadingSpinner";

export function AddCategoryDialog() {
  const dispatch = useDispatch();
  const openCreateCategoryPopup = useSelector((state)=>state.category.openCreateCategoryPopup)
  console.log("inside pupup : ", openCreateCategoryPopup)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const {loading, handleCreateCategory} = useCreateCategory();
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

  const handleClose = ()=>{
        dispatch(categoryActions.setCreateCategoryPopup(false))   
  }

  return (
    <Dialog open={openCreateCategoryPopup} onOpenChange={()=>dispatch(categoryActions.setCreateCategoryPopup(false))}>
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
            <Button type="button" variant="outline" onClick={()=>handleClose()}>
              Cancel
            </Button>
            <Button type="submit">
              {loading ? <WhiteLoadingSpinner size={"sm"}/>:"Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}