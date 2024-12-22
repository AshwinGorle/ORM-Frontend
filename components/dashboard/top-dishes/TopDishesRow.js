"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/utils/price";

export default function TopDishesRow({ dish }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{dish.name}</TableCell>
      <TableCell className="text-right">{dish.orderCount}</TableCell>
      <TableCell className="text-right">{formatPrice(dish.revenue)}</TableCell>
    </TableRow>
  );
}