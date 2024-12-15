import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";

export function OrderDetailsDialog({ open, onOpenChange, orderDetails, loading }) {
  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center h-40">
            <Spinner size="lg" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!orderDetails) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order #{orderDetails._id?.slice(-6)}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6 p-4">
            {/* Order Status */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Order Status</h3>
                    <p className="text-sm text-muted-foreground">
                      Created at: {formatDateTime(orderDetails.createdAt)}
                    </p>
                  </div>
                  <Badge variant={orderDetails.status === 'pending' ? 'warning' : 'success'}>
                    {orderDetails.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Customer & Table Info */}
            <Card>
              <CardContent className="p-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p className="text-sm">Name: {orderDetails.customerId.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Table Information</h3>
                  <p className="text-sm">Table Number: {orderDetails.tableId.sequence}</p>
                  <p className="text-sm">Position: {orderDetails.tableId.position}</p>
                  <p className="text-sm">Capacity: {orderDetails.tableId.capacity} people</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {orderDetails.dishes.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{item.dishId.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity} × {formatPrice(item.dishId.price)}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatPrice(item.quantity * item.dishId.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bill Summary */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Bill Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Total Amount</p>
                    <p>{formatPrice(orderDetails.billId.totalAmount)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Discount</p>
                    <p>{formatPrice(orderDetails.billId.totalDiscount)}</p>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p>Final Amount</p>
                    <p>{formatPrice(orderDetails.billId.finalAmount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
} 