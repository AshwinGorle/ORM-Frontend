"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/ui/date-picker";
import { Switch } from "@radix-ui/react-switch";

export default function StatusField({ form }) {
  return (
    <div className="space-y-4">
      {/* Disable Offer Field */}
      <FormField
        control={form.control}
        name="disable"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Disable Offer</FormLabel>
              <div className="text-sm text-muted-foreground">
                Temporarily disable this offer
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Start Date Field */}
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date</FormLabel>
            {/* <FormControl> */}
              <DatePicker value={field.value} onChange={field.onChange} />
            {/* </FormControl> */}
            <FormMessage />
          </FormItem>
        )}
      />

      {/* End Date Field */}
      <FormField
        control={form.control}
        name="endDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>End Date</FormLabel>
            <FormControl>
              <DatePicker value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
