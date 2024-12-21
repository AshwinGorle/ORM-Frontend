

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { offerSchema } from "@/components/offers/schemas/offer.schema";
import OfferForm from "@/components/offers/OfferForm";
import { useCreateOffer } from "@/hooks/offer/useCreateOffer.js";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { EditableImage } from "@/components/ImageInput";
import SelectMultipleDishesForOffer from "../../create-offer/component/SelectMultipleDishesForOffer";
import { useParams } from "next/navigation";
import { useGetOffer } from "@/hooks/offer/useGetOffer";
import { useUpdateOffer } from "@/hooks/offer/useUpdateOffer";

function EditOfferPage() {
  const [logo, setLogo] = useState(null);
  const {id} = useParams();
  const {loading , offer} = useGetOffer(id);
  const {loading :updateLoading, handleUpdateOffer} = useUpdateOffer();
  const [selectedDishes, setSelectedDishes] = useState([]);
  
  const form = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: "",
      type: "global",
      appliedAbove: 0,
      disable: false,
      discountType: "percent",
      value: 0,
      startDate: null,
      enDate: null,
      description: "",
    },
  });

  useEffect(()=>{
    if(offer){
        form.reset({
            title: offer.title || "",
            type: offer.type || "global",
            appliedAbove: offer.appliedAbove || 0,
            disable: offer.disable || false,
            discountType: offer.discountType || "percent",
            value: offer.value || 0,
            startDate: offer.startDate || null,
            endDate: offer.endDate || null,
            description: offer.description || "",
          });
    
          // Set additional state values
          setLogo(offer.logo || null);
          setSelectedDishes(offer.appliedOn || []);
    }
  },[offer])
  
  

  const onSubmit = (data) => {
    const selectedDishesIds = selectedDishes?.map((dish) =>
      dish?._id.toString()
    );
    console.log("update-offer-data----------", data, selectedDishesIds);
    data["appliedOn"] = selectedDishesIds;
    if(logo) data["logo"] = logo;

    handleUpdateOffer(offer._id, data)

   
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

      <div className="flex gap-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <OfferForm form={form} />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()} // Navigate back to previous page
              >
                Cancel
              </Button>
              <Button type="submit">
                {false ? <Spinner size={"sm"} /> : "Update"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-6 flex flex-col justify-center self-center ">
          <EditableImage imageUrl={logo} setImageUrl={setLogo} element={null} />
          <SelectMultipleDishesForOffer
            selectedInputs={selectedDishes}
            setSelectedInputs={setSelectedDishes}
          />
        </div>
      </div>
    </div>
  );
}

export default EditOfferPage;