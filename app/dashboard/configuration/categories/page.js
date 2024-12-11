"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddCategoryDialog } from "@/components/categories/AddCategoryDialog";
import { DeleteConfirmDialog } from "@/components/categories/DeleteConfirmDialog";
import { EditCategoryDialog } from "@/components/categories/EditCategoryDialog";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, { id: Date.now(), ...newCategory }]);
    setIsAddDialogOpen(false);
  };     

  const handleEditCategory = (updatedCategory) => {
    setCategories(
        categories.map((ctg) =>
        ctg.id === updatedCategory.id ? updatedCategory : ctg
      )
    );
    setIsEditDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = () => {
    setCategories(
      categories.filter((ctg) => ctg.id !== selectedCategory.id)
    );
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Categories Management</h1>
          <p className="text-muted-foreground">
            Add and manage categories for your dishes
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No categories added yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AddCategoryDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddCategory}
      />

      <EditCategoryDialog   
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        category={selectedCategory}
        onEdit={handleEditCategory}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteCategory}
        category={selectedCategory}
      />
    </div>
  );
}