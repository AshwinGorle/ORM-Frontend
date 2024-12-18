"use client";

import BasicInfoFields from "./form-fields/BasicInfoFields";
import DiscountFields from "./form-fields/DiscountFields";
import StatusField from "./form-fields/StatusField";

export default function OfferForm({ form }) {
  return (
    <div className="space-y-4 gap-5">

      <BasicInfoFields form={form} />
      <DiscountFields form={form} />
      <StatusField form={form} />

    </div>
  );
}