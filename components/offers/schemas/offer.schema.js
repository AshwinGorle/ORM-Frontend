import * as z from "zod";

export const offerSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["global", "specific"]),
  discountType: z.enum(["percent", "amount"]),
  value: z.number().min(0),
  appliedAbove: z.number().min(0),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  disable: z.boolean().default(false),
});