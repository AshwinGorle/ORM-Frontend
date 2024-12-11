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
import { AddIngredientDialog } from "@/components/ingredients/AddIngredientDialog";
import { DeleteConfirmDialog } from "@/components/ingredients/DeleteConfirmDialog";
import { EditIngredientDialog } from "@/components/ingredients/EditIngredientDialog";
import { useGetAllIngredients } from "@/hooks/ingredient/useGetAllIngredient";
import { useDeleteIngredient } from "@/hooks/ingredient/useDeleteIngredient";

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const {ingredients : myIngredients, loading} = useGetAllIngredients();
  const {loading : deleteLoading, handleDeleteIngredient} = useDeleteIngredient(setIsDeleteDialogOpen);

  const handleAddIngredient = (newIngredient) => {
    setIngredients([...ingredients, { id: Date.now(), ...newIngredient }]);
    setIsAddDialogOpen(false);
  };

  const handleEditIngredient = (updatedIngredient) => {
    setIngredients(
      ingredients.map((ing) =>
        ing.id === updatedIngredient.id ? updatedIngredient : ing
      )
    );
    setIsEditDialogOpen(false);
    setSelectedIngredient(null);
  };

  const handleDeleteIngredientLocal = () => {
    handleDeleteIngredient(selectedIngredient._id);
    setSelectedIngredient(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Ingredients Management</h1>
          <p className="text-muted-foreground">
            Add and manage ingredients for your dishes
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Ingredient
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow key={"7961"}>
              <TableHead key={"7962"}>Name</TableHead>
              <TableHead key={"7963"}>Description</TableHead>
              <TableHead key={"7964"} className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myIngredients?.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell className="font-medium">{ingredient.name}</TableCell>
                <TableCell>{ingredient.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedIngredient(ingredient);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedIngredient(ingredient);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {ingredients.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No ingredients added yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AddIngredientDialog
        open={isAddDialogOpen}
        setOpen={setIsAddDialogOpen}
        onAdd={handleAddIngredient}
      />

      <EditIngredientDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        ingredient={selectedIngredient}
        onEdit={handleEditIngredient}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteIngredientLocal}
        ingredient={selectedIngredient}
      />
    </div>
  );
}