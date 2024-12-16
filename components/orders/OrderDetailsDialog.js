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

  const safeGet = (obj, path, defaultValue = 'N/A') => {
    try {
      return path.split('.').reduce((acc, part) => acc[part], obj) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order #{safeGet(orderDetails, '_id', '').slice(-6)}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6 p-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Order Status</h3>
                    <p className="text-sm text-muted-foreground">
                      Created at: {safeGet(orderDetails, 'createdAt')}
                    </p>
                  </div>
                  <Badge variant={orderDetails.status === 'pending' ? 'warning' : 'success'}>
                    {orderDetails.status || 'N/A'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p className="text-sm">Name: {safeGet(orderDetails, 'customerId.name')}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Table Information</h3>
                  <p className="text-sm">Table Number: {safeGet(orderDetails, 'tableId.sequence')}</p>
                  <p className="text-sm">Position: {safeGet(orderDetails, 'tableId.position')}</p>
                  <p className="text-sm">Capacity: {safeGet(orderDetails, 'tableId.capacity')} people</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {(orderDetails?.dishes || []).map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{safeGet(item, 'dishId.name')}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity || 0} × {formatPrice(safeGet(item, 'dishId.price', 0))}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatPrice((item.quantity || 0) * (safeGet(item, 'dishId.price', 0)))}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Bill Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Total Amount</p>
                    <p>{formatPrice(safeGet(orderDetails, 'billId.totalAmount', 0))}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Discount</p>
                    <p>{formatPrice(safeGet(orderDetails, 'billId.totalDiscount', 0))}</p>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p>Final Amount</p>
                    <p>{formatPrice(safeGet(orderDetails, 'billId.finalAmount', 0))}</p>
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