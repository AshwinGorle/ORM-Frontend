'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"


const MyBillCard = ({ bill }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "PP p")
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl font-bold">{bill.hotelId.name}</CardTitle>
        <p className="text-sm text-muted-foreground">Order #{bill._id.slice(-6)}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Date: {formatDate(bill.createdAt)}</span>
          <span>Table: {bill.tableId.sequence}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Paid by: {bill.customerName}</span>
        </div>
        <Separator />
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead className="py-2">Item</TableHead>
              <TableHead className="text-right py-2">Qty</TableHead>
              <TableHead className="text-right py-2">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bill.orderedItems.map((item) => (
              <TableRow key={item._id} className="text-sm">
                <TableCell className="py-1">{item.dishId.name}</TableCell>
                <TableCell className="text-right py-1">{item.quantity}</TableCell>
                <TableCell className="text-right py-1">${(item.quantity * item.dishId.price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${bill.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span>-${bill.totalDiscount.toFixed(2)}</span>
          </div>
          { bill.customDiscount && <div className="flex justify-between">
            <span>Custom Discount:</span>
            <span>-${bill.customDiscount.toFixed(2)}</span>
          </div>}
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${bill.finalAmount.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-center space-y-2 pt-2">
        <Badge variant={bill.status === "paid" ? "success" : "destructive"}>
          {bill.status.toUpperCase()}
        </Badge>
        <p className="text-xs text-muted-foreground">Thank you for dining with us!</p>
      </CardFooter>
    </Card>
  )
}

export default MyBillCard

