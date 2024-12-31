"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { offerSchema } from "@/components/offers/schemas/offer.schema";
import OfferForm from "@/components/offers/OfferForm";
import { useCreateOffer } from "@/hooks/offer/useCreateOffer.js";
import { Spinner } from "@/components/ui/spinner";
import SelectMultiple from "@/components/dishes/component/SectMultiple";
import { useState } from "react";
import { EditableImage } from "@/components/ImageInput";
import SelectMultipleDishesForOffer from "./component/SelectMultipleDishesForOffer";
import { Label } from "@radix-ui/react-dropdown-menu";

function AddOfferPage() {
  const [showDishSelector, setShowDishSelector] = useState(false);
  const { loading, handleCreateOffer } = useCreateOffer();
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [logo, setLogo] = useState(null);

  const form = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      name: "",
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
    if (logo) data["logo"] = logo;
    handleCreateOffer(data);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Offer</h1>
          <p className="text-muted-foreground">
            Create and manage your special offers and discounts here.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className=" justify-center self-center ">
          <div className="flex justify-center ">
            <EditableImage
              imageUrl={logo}
              setImageUrl={setLogo}
              element={null}
            />
          </div>
          {showDishSelector && (
            <div className="mt-4 w-full">
              <div className=" font-semibold w-full">Select Dish</div>
              <SelectMultipleDishesForOffer
                selectedInputs={selectedDishes}
                setSelectedInputs={setSelectedDishes}
              />
            </div>
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <OfferForm setShowDishSelector={setShowDishSelector} form={form} />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()} // Navigate back to previous page
              >
                Cancel
              </Button>
              <Button type="submit">
                {loading ? <Spinner size={"sm"} /> : "Add Offer"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddOfferPage;
