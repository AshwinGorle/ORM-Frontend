import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllIngredients } from "@/hooks/ingredient/useGetAllIngredient";
const { useState, useEffect } = require("react");


//////////
const IngredientInput = ({
  setSelectedIngredients,
  selectedIngredients,
}) => {
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const { loading: ingredientsLoading, ingredients = [] } = useGetAllIngredients();

  useEffect(() => {
    setFilteredIngredients(ingredients);
  }, [ingredients]);

  const toggleIngredientSelection = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.some((item) => item._id === ingredient._id)
        ? prev.filter((item) => item._id !== ingredient._id)
        : [...prev, ingredient]
    );
  };

  return (
    <div className="flex flex-col justify-items-center ">
      <div className="flex flex-wrap gap-2 mt-2 p-2 my-2 border border-gray-200 rounded-md">
        {selectedIngredients.map((ingredient) => (
          <Badge key={ingredient._id} className="flex items-center gap-1">
            {ingredient.name}
            <X
              className="h-4 w-4 cursor-pointer"
              onClick={() => toggleIngredientSelection(ingredient)}
            />
          </Badge>
        ))}
      </div>
      <div>
      <ScrollArea className="h-[200px]  rounded-md border p-4">
        {ingredientsLoading && <Spinner></Spinner>}
        <Command>
          <CommandInput placeholder="Type a ingredient or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {filteredIngredients?.map((ingredient) => {
                return (
                  <CommandItem key={ingredient._id}>
                    <Checkbox
                      checked={selectedIngredients?.some(
                        (ing) => ing._id == ingredient._id
                      )}

                      onCheckedChange={()=>toggleIngredientSelection(ingredient)}
                    />
                    {ingredient.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </ScrollArea>
      </div>
    </div>
  );
};

export default IngredientInput;
