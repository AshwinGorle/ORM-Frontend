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
import { Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllIngredients } from "@/hooks/ingredient/useGetAllIngredient";
import { useGetAllCategories } from "@/hooks/category/useGetAllCategories";
import { useGetAllOffers } from "@/hooks/offer/useGetAllOffers";
import { useGetAllDishes } from "@/hooks/dish/useGetAllDishes";
import { AddIngredientDialog } from "@/components/ingredients/AddIngredientDialog";
import { ingredientActions } from "@/redux/slices/ingredientsSlice";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
const { useState, useEffect } = require("react");


//////////
const SelectMultiple = ({
  setSelectedInputs,
  selectedInputs,
  type
}) => {

  let inputs;
  let loading
  const dispatch = useDispatch();

  const [filteredInputs, setFilteredInputs] = useState([]);

  const { loading: ingredientsLoading, ingredients = [] } = useGetAllIngredients(type);
  const { loading : categoryLoading, categories = []} = useGetAllCategories(type);
  const { loading : offerLoading, offers = []} = useGetAllOffers(type);
  const { loading : dishLoading, dishes = []} = useGetAllDishes(type);
  
  switch(type){
    case "ingredient" : 
    inputs = ingredients
    loading = ingredientsLoading
    break
    
    case "category" : 
    inputs = categories
    loading = categoryLoading
    break
    
    case "offer" : 
    inputs = offers
    loading = offerLoading
    break

    case "dish" : 
    inputs = dishes
    loading = dishLoading
    break
    
  }
  console.log(`${type} in select multiple : ${type}`, inputs)

  useEffect(() => {
    setFilteredInputs(inputs);
  }, [inputs]);

  const toggleInputSelection = (input) => {
    setSelectedInputs((prev) =>
      prev.some((item) => item._id === input._id)
        ? prev.filter((item) => item._id !== input._id)
        : [...prev, input]
    );
  };

  return (
    <div className="flex flex-col justify-items-center ">
      <div className="flex flex-wrap w-full gap-2 mt-2 p-2 my-2 border border-gray-200 rounded-md">
        {selectedInputs?.map((input) => (
          <Badge key={input._id} className=" w-fit text-nowrap items-center gap-1">
            {input.name}
            <X
              className="h-4 w-4 cursor-pointer"
              onClick={() => toggleInputSelection(input)}
            />
          </Badge>
        ))}
      </div>
      <div>
      <ScrollArea className="h-[200px]  rounded-md border p-4">
        {loading && <Spinner></Spinner>}
        {type == "ingredient" && <Button  variant="outline" type="button" onClick={()=> dispatch(ingredientActions.setCreateIngredientPopup(true))} className="absolute right-2 top-2 py-1 "><Plus color="gray" /></Button>}
        <Command>
          <CommandInput placeholder={`Type a ${type} or search...`} />
          <CommandList>
            <CommandEmpty>{`No ${type} found.`}</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {filteredInputs?.map((input) => {
                return (
                  <CommandItem key={input._id}>
                    <Checkbox
                      checked={selectedInputs?.some(
                        (ing) => ing._id == input._id
                      )}

                      onCheckedChange={()=>toggleInputSelection(input)}
                    />
                    {input.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </ScrollArea>
      </div>
      <AddIngredientDialog/>
    </div>
  );
};

export default SelectMultiple;
