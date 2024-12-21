import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { TableIcon, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BillCard({ bill }) {
  if (!bill) return null;

  const date = new Date(bill.createdAt);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <Card className="w-full bg-white">
      <CardHeader className="border-b bg-gray-50/50">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold text-gray-900">
              {bill.hotelId?.name}
            </CardTitle>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <TableIcon className="h-4 w-4" />
                <span>Table #{bill.tableId?.sequence}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3">
              Bill #{bill._id.slice(-6)}
            </Badge>
            <Badge variant="default" className="bg-green-500">
              Final
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Customer Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium">{bill.customerName || 'Guest'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <Badge variant="outline" className="mt-1">
              {bill.paymentStatus || 'Pending'}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-500">Order Count</p>
            <p className="font-medium">{bill.orderedItems?.length || 0} items</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bill.orderedItems?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.dishId?.name}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">₹{item.dishId?.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">
                    ₹{(item.quantity * item.dishId?.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Bill Summary */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{bill.totalAmount?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">- ₹{bill.totalDiscount?.toFixed(2) || '0.00'}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total Amount</span>
            <span className="text-lg">₹{bill.finalAmount?.toFixed(2) || '0.00'}</span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500">
          <p>Thank you for dining with us!</p>
          <p className="text-xs mt-1">This is a computer-generated bill</p>
        </div>
      </CardContent>
    </Card>
  );
} 



// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Separator } from "@/components/ui/separator";
// import Image from "next/image";

// export function BillCard({ bill }) {
//   if (!bill) return null;

//   const date = new Date(bill?.createdAt);
//   const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
//   const billNumber = bill?._id ? `#${bill._id.slice(-6)}` : 'N/A';

//   return (
//     <Card className="w-full bg-white shadow-lg">
//       <CardHeader className="border-b">
//         <div className="flex justify-between items-start">
//           <div className="space-y-1">
//             <CardTitle className="text-2xl font-bold">{bill?.hotelId?.name || 'Hotel Name'}</CardTitle>
//             <div className="text-sm text-gray-500 space-y-0.5">
//               <p>GST No: {bill?.hotelId?.gstNumber || 'N/A'}</p>
//               <p>{bill?.hotelId?.address || 'N/A'}</p>
//               <p>Phone: {bill?.hotelId?.phone || 'N/A'}</p>
//             </div>
//           </div>
//           <div className="text-right space-y-1">
//             <p className="text-sm font-medium">Bill No: {billNumber}</p>
//             <p className="text-sm text-gray-500">{formattedDate}</p>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-6 p-6">
//         <div className="grid grid-cols-3 gap-4 text-sm">
//           <div>
//             <p className="font-semibold text-gray-600">Customer</p>
//             <p className="mt-1">{bill?.customerName || 'N/A'}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-600">Table</p>
//             <p className="mt-1">#{bill?.tableId?.sequence || 'N/A'}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-600">Payment Status</p>
//             <p className="mt-1">{bill?.paymentStatus || 'Pending'}</p>
//           </div>
//         </div>

//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="py-2">Item</TableHead>
//               <TableHead className="py-2">Qty</TableHead>
//               <TableHead className="py-2">Price</TableHead>
//               <TableHead className="py-2 text-right">Total</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {(bill?.orderedItems || []).map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell className="py-1 font-medium">{item?.dishId?.name || 'N/A'}</TableCell>
//                 <TableCell className="py-1">{item?.quantity || 0}</TableCell>
//                 <TableCell className="py-1">₹{(item?.dishId?.price || 0).toFixed(2)}</TableCell>
//                 <TableCell className="py-1 text-right">
//                   ₹{((item?.quantity || 0) * (item?.dishId?.price || 0)).toFixed(2)}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <Separator className="my-2" />
//         <div className="space-y-1 text-sm">
//           <div className="flex justify-between">
//             <p>Subtotal:</p>
//             <p>₹{(bill?.totalAmount || 0).toFixed(2)}</p>
//           </div>
//           <div className="flex justify-between">
//             <p>Discount:</p>
//             <p>₹{(bill?.totalDiscount || 0).toFixed(2)}</p>
//           </div>
//           <div className="flex justify-between font-bold">
//             <p>Total:</p>
//             <p>₹{(bill?.finalAmount || 0).toFixed(2)}</p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
