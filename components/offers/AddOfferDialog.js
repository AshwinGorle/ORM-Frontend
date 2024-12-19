"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { offerSchema } from "./schemas/offer.schema";
import OfferForm from "./OfferForm";
import { useCreateOffer } from "@/hooks/offer/useCreateOffer.js";
import { Spinner } from "../ui/spinner";
import SelectMultiple from "../dishes/component/SectMultiple";
import { useState } from "react";
import { EditableImage } from "../ImageInput";


export function AddOfferDialog({ open, onOpenChange }) {
  const { loading, handleCreateOffer } = useCreateOffer(onOpenChange);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [logo, setLogo] = useState(null);
  const form = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: "",
      // appliedOn : [],
      type: "global",
      appliedAbove: 0,
      disable: false,
      discountType: "percentage",
      value: 0,
      startDate: null,
      enDate: null,
      description: "",
    },
  });

  const onSubmit = (data) => {
    const selectedDishesIds = selectedDishes?.map((dish) =>
      dish?._id.toString()
    );
    data["appliedOn"] = selectedDishesIds;
    if(logo) data["logo"] = logo;
    console.log("form data--------", data);
    handleCreateOffer(data);
  };

  return (
        <>     
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Offer</DialogTitle>
        </DialogHeader>
        <div className="flex gap-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <OfferForm form={form} />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {loading ? <Spinner size={"sm"} /> : "Add Offer"}
                </Button>
              </div>
            </form>
          </Form>
          <div>
            <EditableImage
            imageUrl={logo}
            setImageUrl={setLogo}
            // size={"sm"}
            element={null}
            />
            <SelectMultiple
              selectedInputs={selectedDishes}
              setSelectedInputs={setSelectedDishes}
              type={"dish"}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>

  );
}
