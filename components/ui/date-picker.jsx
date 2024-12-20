"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// export function DatePicker({ value, onChange }) {
//   const [open, setOpen] = React.useState(false);

//   const handleSelect = (date) => {
//     if (date) {
//       onChange(date); // Update the selected date
//       setOpen(false); // Close the popover after selecting a date
//     }
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           className={cn(
//             "w-[240px] justify-start text-left font-normal",
//             !value && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {value ? format(value, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           selected={value}
//           onSelect={handleSelect}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }


export function DatePicker({ value, onChange }) {
  const [date, setDate] = React.useState(value || new Date(Date.now()));

  const handleChange = (selectedDate)=>{
    console.log("Selected Date", selectedDate)
    setDate(selectedDate);
    onChange(selectedDate);

  }

  return (
    <Popover className="z-[95] w-auto p-0" align="start">
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[110] w-auto p-0" align="start" >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
