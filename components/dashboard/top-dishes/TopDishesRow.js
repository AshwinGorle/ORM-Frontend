"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/utils/price";

export default function TopDishesRow({ dish }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{dish.name}</TableCell>
      <TableCell className="text-right">{dish.totalQuantity}</TableCell>
      <TableCell className="text-right">{formatPrice(dish.totalRevenue)}</TableCell>
    </TableRow>
  );
}