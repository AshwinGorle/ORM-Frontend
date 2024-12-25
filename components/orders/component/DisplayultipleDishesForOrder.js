// "use client";

// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandSeparator,
// } from "@/components/ui/command";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { CommandList } from "@/components/ui/command";
// import { Badge } from "@/components/ui/badge";
// import { X } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Spinner } from "@/components/ui/spinner";
// import { useGetAllDishes } from "@/hooks/dish/useGetAllDishes";

// const { useState, useEffect } = require("react");

// //////////
// const SelectMultipleDishesForOrder = ({
//   setSelectedInputs,
//   selectedInputs,
//   type = 'dish'
// }) => {

//   let inputs;
//   let loading

//   const [filteredInputs, setFilteredInputs] = useState([]);
//   const { loading : dishLoading, dishes = []} = useGetAllDishes(type);

//   switch(type){
//     case "dish" :
//     inputs = dishes
//     loading = dishLoading
//     break
//   }
//   console.log(`${type} in select multiple dish for ORDER : ${type}`, inputs)

//   useEffect(() => {
//     setFilteredInputs(inputs);
//   }, [inputs]);

//   const toggleInputSelection = (input) => {
//     setSelectedInputs((prev) =>
//       prev.some((item) => item._id === input._id)
//         ? prev.filter((item) => item._id !== input._id)
//         : [...prev, input]
//     );
//   };

//   return (
//     <div className="flex flex-col justify-items-center ">
//       <div className="flex flex-wrap w-full gap-2 mt-2 p-2 my-2 border border-gray-200 rounded-md">
//         {selectedInputs?.map((input) => (
//           <Badge key={input._id} className=" w-fit text-nowrap items-center gap-1">
//             {input.name}
//             <X
//               className="h-4 w-4 cursor-pointer"
//               onClick={() => toggleInputSelection(input)}
//             />
//           </Badge>
//         ))}
//       </div>
//       <div>
//       <ScrollArea className="h-[200px]  rounded-md border p-4">
//         {loading && <Spinner></Spinner>}
//         <Command>
//           <CommandInput placeholder={`Type a ${type} or search...`} />
//           <CommandList>
//             <CommandEmpty>{`No ${type} found.`}</CommandEmpty>
//             <CommandGroup heading="Suggestions">
//               {filteredInputs?.map((input) => {
//                 return (
//                   <CommandItem key={input._id}>
//                     <Checkbox
//                       checked={selectedInputs?.some(
//                         (ing) => ing._id == input._id
//                       )}

//                       onCheckedChange={()=>toggleInputSelection(input)}
//                     />
//                     {input.name}
//                     {/* here i want to take quatity in input  default 1*/}
//                   </CommandItem>
//                 );
//               })}
//             </CommandGroup>
//             <CommandSeparator />
//           </CommandList>
//         </Command>
//       </ScrollArea>
//       </div>
//     </div>
//   );
// };

// export default SelectMultipleDishesForOrder;

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
import { CrossIcon, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllDishes } from "@/hooks/dish/useGetAllDishes";
const { useState, useEffect } = require("react");

const DisplayMultipleDishesForOrder = ({
  setSelectedInputs,
  selectedInputs,
  type = "dish",
  usedPlace = 'n/a'
}) => {
  const billEditor = usedPlace == 'billEditor' ? true : false;
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
  console.log(`${type} in select multiple dish for ORDER : ${type}`, inputs);

  useEffect(() => {
    setFilteredInputs(inputs);
  }, [inputs]);

  const toggleInputSelection = (input) => {
    setSelectedInputs(
      (prev) =>
        prev.some((item) => item._id === input._id)
          ? prev.filter((item) => item._id !== input._id)
          : [...prev, { ...input, orderQuantity: 1 }] // Add with default quantity of 1
    );
  };

  const updateOrderQuantity = (input, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1
    setSelectedInputs((prev) =>
      prev.map((item) =>
        item._id === input._id ? { ...item, orderQuantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="flex flex-col justify-items-center">
      {/* <div className="flex flex-wrap  gap-2  p-2 mb-2 border border-gray-200 rounded-md">
        {selectedInputs?.map((input) => (
          <Badge
            key={input._id}
            className="w-fit text-nowrap items-center gap-1"
          >
            {input.name}
            <X
              className="h-4 w-4 cursor-pointer"
              onClick={() => toggleInputSelection(input)}
            />
          </Badge>
        ))}
      </div> */}
      <div>
        <ScrollArea className={` ${billEditor ? 'h-[300px]' : 'h-[200px]'  } rounded-md border p-4`}>
          {loading && <Spinner />}
          <Command>
            {/* <CommandInput placeholder={`Type a ${type} or search...`} /> */}
            <CommandList>
              <CommandEmpty>{`No ${type} found.`}</CommandEmpty>
              <CommandGroup heading="Select Dishes">
                {filteredInputs?.map((input) => {
                  const selectedInput = selectedInputs?.find(
                    (ing) => ing._id === input._id
                  );
                  {
                    return selectedInput ? (
                      <CommandItem key={input._id}>
                        <button className=" bg-red-500 rounded-sm" onClick={() => toggleInputSelection(input)}>
                        <X 
                          color="white"
                          // checked={selectedInput}
                          // onCheckedChange={() => toggleInputSelection(input)}
                        />
                        </button>
                        {input.name}
                        {selectedInput && (
                          <div className="flex ml-auto items-center ml-4">
                            <button
                              className="px-2  border "
                              onClick={() =>
                                updateOrderQuantity(
                                  input,
                                  selectedInput.orderQuantity - 1
                                )
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="w-8 text-center border"
                              value={selectedInput.orderQuantity}
                              onChange={(e) =>
                                updateOrderQuantity(
                                  input,
                                  parseInt(e.target.value, 10)
                                )
                              }
                            />
                            <button
                              className="px-2 border"
                              onClick={() =>
                                updateOrderQuantity(
                                  input,
                                  selectedInput.orderQuantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        )}
                      </CommandItem>
                    ) :  ""
                  }
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

export default DisplayMultipleDishesForOrder;
