"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { offerSchema } from "./schemas/offer.schema";
import OfferForm from "./OfferForm";

export function AddOfferDialog({ open, onOpenChange, onAdd }) {
  const form = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "global",
      discountType: "percentage",
      value: 0,
      appliedAbove: 0,
      disable: false,
    },
  });

  const onSubmit = (data) => {
    onAdd(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Offer</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <OfferForm form={form} />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Offer</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}