"use client";

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
import { useGetAllCategories } from "@/hooks/category/useGetAllCategories";
import { useGetAllOffers } from "@/hooks/offer/useGetAllOffers";
import { useGetAllDishes } from "@/hooks/dish/useGetAllDishes";
import { useState, useEffect } from "react";

//////////
const SelectOne = ({ setSelectedInput, selectedInput, type }) => {
  let inputs;
  let loading;

  const [filteredInputs, setFilteredInputs] = useState([]);

  const { loading: ingredientsLoading, ingredients = [] } = useGetAllIngredients(type);
  const { loading: categoryLoading, categories = [] } = useGetAllCategories(type);
  const { loading: offerLoading, offers = [] } = useGetAllOffers(type);
  const { loading: dishLoading, dishes = [] } = useGetAllDishes(type);

  switch (type) {
    case "ingredient":
      inputs = ingredients;
      loading = ingredientsLoading;
      break;

    case "category":
      inputs = categories;
      loading = categoryLoading;
      break;

    case "offer":
      inputs = offers;
      loading = offerLoading;
      break;

    case "dish":
      inputs = dishes;
      loading = dishLoading;
      break;
  }

  console.log(`${type} in select one : ${type}`, inputs);

  useEffect(() => {
    setFilteredInputs(inputs);
  }, [inputs]);

  const handleSelection = (input) => {
    setSelectedInput(input); // Set only one input
  };

  return (
    <div className="flex flex-col justify-items-center">
      {/* Selected Input Display */}
      {selectedInput && (
        <div className="flex items-center gap-2 p-2 my-2 border border-gray-200 rounded-md">
          <Badge className="flex items-center gap-1">
            {selectedInput.name || selectedInput.title }
            <X
              className="h-4 w-4 cursor-pointer"
              onClick={() => setSelectedInput(null)} // Clear selection
            />
          </Badge>
        </div>
      )}

      {/* Input Selection List */}
      <div>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          {loading && <Spinner />}
          <Command>
            <CommandInput placeholder={`Type a ${type} or search...`} />
            <CommandList>
              <CommandEmpty>{`No ${type} found.`}</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {filteredInputs?.map((input) => (
                  <CommandItem
                    key={input._id}
                    className="flex items-center"
                  >
                    <Checkbox onClick={() => handleSelection(input)} checked={selectedInput?._id === input._id} />
                    {input.name || input.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          </Command>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SelectOne;
