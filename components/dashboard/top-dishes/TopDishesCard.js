"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import TopDishesRow from "./TopDishesRow";
import { useTopDishes } from "@/hooks/useTopDishes";

export default function TopDishesCard() {
  const { dishes } = useTopDishes();

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Top 10 Dishes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dish Name</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dishes.map((dish) => (
                <TopDishesRow key={dish.id} dish={dish} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}