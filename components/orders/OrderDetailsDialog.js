import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { safeGet, formatPrice } from "@/lib/utils";
import { Clock, MapPin, User, Building2, Receipt } from "lucide-react";

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'preparing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Order #{safeGet(orderDetails, '_id', 'N/A').slice(-6)}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6 p-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <User className="h-4 w-4" />
                        <span className="text-sm">Customer</span>
                      </div>
                      <p className="font-medium text-lg">{safeGet(orderDetails, 'customerId.name', 'N/A')}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">Table</span>
                      </div>
                      <p className="font-medium text-lg">
                        Table {safeGet(orderDetails, 'tableId.sequence', 'N/A')}
                        <span className="text-sm text-gray-500 ml-2">
                          ({safeGet(orderDetails, 'tableId.position', 'N/A')})
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Building2 className="h-4 w-4" />
                        <span className="text-sm">Hotel</span>
                      </div>
                      <p className="font-medium text-lg">{safeGet(orderDetails, 'hotelId.name', 'N/A')}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Created At</span>
                      </div>
                      <p className="font-medium">
                        {new Date(orderDetails?.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <Badge 
                    className={`px-3 py-1.5 text-sm font-medium ${getStatusColor(orderDetails?.status)}`}
                  >
                    {orderDetails?.status?.toUpperCase() || 'N/A'}
                  </Badge>
                  {orderDetails?.note && (
                    <p className="text-sm text-gray-500 italic">
                      Note: {orderDetails.note}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Receipt className="h-5 w-5 text-gray-500" />
                  <h3 className="font-semibold text-lg">Order Items</h3>
                </div>
                <div className="space-y-4">
                  {(orderDetails?.dishes || []).map((item, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-lg">{safeGet(item, 'dishId.name')}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity || 0} × {formatPrice(safeGet(item, 'dishId.price', 0))}
                        </p>
                      </div>
                      <p className="font-semibold text-lg">
                        {formatPrice((item.quantity || 0) * (safeGet(item, 'dishId.price', 0)))}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t flex justify-end">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold">
                      {formatPrice(
                        (orderDetails?.dishes || []).reduce(
                          (total, item) => total + ((item.quantity || 0) * (safeGet(item, 'dishId.price', 0))),
                          0
                        )
                      )}
                    </p>
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