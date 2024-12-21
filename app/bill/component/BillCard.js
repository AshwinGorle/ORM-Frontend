import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function BillCard({ bill }) {
  if (!bill) return null;

  const date = new Date(bill?.createdAt);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  const billNumber = bill?._id ? `#${bill._id.slice(-6)}` : 'N/A';

  return (
    <Card className="w-full bg-white shadow-lg">
      <CardHeader className="border-b">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">{bill?.hotelId?.name || 'Hotel Name'}</CardTitle>
            <div className="text-sm text-gray-500 space-y-0.5">
              <p>GST No: {bill?.hotelId?.gstNumber || 'N/A'}</p>
              <p>{bill?.hotelId?.address || 'N/A'}</p>
              <p>Phone: {bill?.hotelId?.phone || 'N/A'}</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm font-medium">Bill No: {billNumber}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-gray-600">Customer</p>
            <p className="mt-1">{bill?.customerName || 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Table</p>
            <p className="mt-1">#{bill?.tableId?.sequence || 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Payment Status</p>
            <p className="mt-1">{bill?.paymentStatus || 'Pending'}</p>
          </div>
        </div>

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
            {(bill?.orderedItems || []).map((item, index) => (
              <TableRow key={index}>
                <TableCell className="py-1 font-medium">{item?.dishId?.name || 'N/A'}</TableCell>
                <TableCell className="py-1">{item?.quantity || 0}</TableCell>
                <TableCell className="py-1">₹{(item?.dishId?.price || 0).toFixed(2)}</TableCell>
                <TableCell className="py-1 text-right">
                  ₹{((item?.quantity || 0) * (item?.dishId?.price || 0)).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Separator className="my-2" />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>₹{(bill?.totalAmount || 0).toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount:</p>
            <p>₹{(bill?.totalDiscount || 0).toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Total:</p>
            <p>₹{(bill?.finalAmount || 0).toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
