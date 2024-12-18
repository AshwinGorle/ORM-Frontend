"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import OfferForm from "./OfferForm";
import { EditableImage } from "../ImageInput";
import { useUpdateOffer } from "@/hooks/offer/useUpdateOffer";

const offerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["global", "specific"]),
  discountType: z.enum(["percentage", "amount"]),
  value: z.number().min(0),
  appliedAbove: z.number().min(0),
  startDate: z.date(),
  endDate: z.date(),
  disable: z.boolean().default(false),
});

export function EditOfferDialog({ open, onOpenChange, offer }) {
  const [logo, setLogo] = useState("");
  const {loading , handleUpdateOffer} = useUpdateOffer(onOpenChange);
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
      logo: logo || ""
    },
  });

  useEffect(() => {
    if (offer) {
      form.reset(offer);
    }
  }, [offer, form]);

  const onSubmit = (data) => {
    const updateData = data
    if(logo) updateData["logo"] = logo
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Offer</DialogTitle>
        </DialogHeader>
        <EditableImage imageUrl={logo} setImageUrl={setLogo}  size={200}/>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <OfferForm form={form} />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}