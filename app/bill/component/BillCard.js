import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function BillCard({ bill }) {
  const date = new Date(bill.createdAt);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">{bill?.hotelId?.name}</CardTitle>
            <p className="text-xs text-muted-foreground">Order ID: {bill._id}</p>
          </div>
          <Image
            src="/placeholder.svg"
            alt="Hotel Logo"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-semibold">Customer:</p>
              <p>{bill?.customerName}</p>
            </div>
            <div>
              <p className="font-semibold">Table:</p>
              <p>{bill?.tableId?.sequence}</p>
            </div>
            <div>
              <p className="font-semibold">Date:</p>
              <p>{formattedDate}</p>
            </div>
          </div>
          <Separator className="my-2" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-2">Item</TableHead>
                <TableHead className="py-2">Qty</TableHead>
                <TableHead className="py-2">Price</TableHead>
                <TableHead className="py-2 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bill?.orderedItems?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="py-1 font-medium">{item?.dishId?.name}</TableCell>
                  <TableCell className="py-1">{item?.quantity}</TableCell>
                  <TableCell className="py-1">₹{item?.dishId?.price?.toFixed(2)}</TableCell>
                  <TableCell className="py-1 text-right">
                    ₹{(item?.quantity * item?.dishId?.price)?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="my-2" />
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>₹{bill?.totalAmount?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount:</p>
              <p>₹{bill?.totalDiscount?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold">
              <p>Total:</p>
              <p>₹{bill?.finalAmount?.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center py-2">
        <p className="text-xs text-muted-foreground">Thank you for your order!</p>
      </CardFooter>
    </Card>
  );
}
