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
import { Button } from "@/components/ui/button";
import OfferCard from "@/components/offers/OfferCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import RemoveOfferCard from "./RemoveOfferCard";
import { CheckboxDisabled } from "@/components/ui/checkbox-disabled";
const { useState, useEffect } = require("react");

//////////
const SelectMultipleDishesForOffer = ({
  setSelectedInputs,
  selectedInputs,
  type = "dish",
}) => {
  let inputs;
  let loading;

  const [filteredInputs, setFilteredInputs] = useState([]);
  const { loading: dishLoading, dishes = [] } = useGetAllDishes(type);

  switch (type) {
    case "dish":
      inputs = dishes;
      loading = dishLoading;
      break;
  }
  console.log(`${type} in select multiple : ${type}`, inputs);

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
          <Badge
            key={input._id}
            className=" w-fit text-nowrap items-center gap-1"
          >
            {input.name}
            <X
              className="h-4 w-4 cursor-pointer"
              onClick={() => toggleInputSelection(input)}
            />
          </Badge>
        ))}
      </div>
      <div>
        <ScrollArea className="h-[800px]  rounded-md border p-4">
          {loading && <Spinner></Spinner>}
          <Command>
            <CommandInput placeholder={`Type a ${type} or search...`} />
            <CommandList>
              <CommandEmpty>{`No ${type} found.`}</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {filteredInputs?.map((input) => {
                  return (
                    <CommandItem key={input._id}>
                      {input.offer ? (
                        <CheckboxDisabled
                          warning={
                            "Please remove already existing offer first!"
                          }
                        />
                      ) : (
                        <Checkbox
                          checked={selectedInputs?.some(
                            (ing) => ing._id == input._id
                          )}
                          onCheckedChange={() => toggleInputSelection(input)}
                        />
                      )}

                      <div>
                        {input?.name}
                        <div className="text-gray-400">
                          {input?.offer && `offer : ${input?.offer?.name}`}
                        </div>
                      </div>

                      {input?.offer && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button className="ml-auto" variant="outline">
                              X
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 z-[60]">
                            <RemoveOfferCard
                              offer={input.offer}
                              dishId={input._id}
                            />
                          </PopoverContent>
                        </Popover>
                      )}
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

export default SelectMultipleDishesForOffer;
