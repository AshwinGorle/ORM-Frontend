"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function DateFilter({ onFilterChange }) {
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState("");

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setMonth(""); // Reset month when date is selected
    onFilterChange({ date: selectedDate, month: null });
  };

  const handleMonthSelect = (selectedMonth) => {
    setMonth(selectedMonth);
    setDate(null); // Reset date when month is selected
    onFilterChange({ date: null, month: selectedMonth });
  };

  const clearFilters = () => {
    setDate(null);
    setMonth("");
    onFilterChange({ date: null, month: null });
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={date ? "default" : "outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Pick a date for bill"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select value={month} onValueChange={handleMonthSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select month for bill" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">January</SelectItem>
          <SelectItem value="2">February</SelectItem>
          <SelectItem value="3">March</SelectItem>
          <SelectItem value="4">April</SelectItem>
          <SelectItem value="5">May</SelectItem>
          <SelectItem value="6">June</SelectItem>
          <SelectItem value="7">July</SelectItem>
          <SelectItem value="8">August</SelectItem>
          <SelectItem value="9">September</SelectItem>
          <SelectItem value="10">October</SelectItem>
          <SelectItem value="11">November</SelectItem>
          <SelectItem value="12">December</SelectItem>
        </SelectContent>
      </Select>

      {(date || month) && (
        <Button variant="ghost" onClick={clearFilters} className="px-3">
          Clear filters
        </Button>
      )}
    </div>
  );
}