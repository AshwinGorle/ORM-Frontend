import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { safeGet, formatPrice } from "@/lib/utils";
import { Clock, MapPin, User, Building2, Receipt } from "lucide-react";

export function OrderDetailsDialog({
  open,
  onOpenChange,
  orderDetails,
  loading,
}) {
  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading Order Details</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center h-40">
            <Spinner />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "preparing":
        return "info";
      default:
        return "success";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-4">
              Order #{safeGet(orderDetails, "_id", "N/A").slice(-6)}
              <Badge variant={getStatusVariant(orderDetails?.status)}>
                {orderDetails?.status?.toUpperCase() || "N/A"}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] space-y-6">
          {/* Order Info */}
          <Card className="rounded-lg border shadow-sm">
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer
                </div>
                <p className="font-medium">
                  {safeGet(orderDetails, "customerId.name", "N/A")}
                </p>
              </div>
              <div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Table
                </div>
                <p className="font-medium">
                  Table {safeGet(orderDetails, "tableId.sequence", "N/A")}{" "}
                  <span className="text-sm text-muted-foreground">
                    ({safeGet(orderDetails, "tableId.position", "N/A")})
                  </span>
                </p>
              </div>
              <div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Hotel
                </div>
                <p className="font-medium">
                  {safeGet(orderDetails, "hotelId.name", "N/A")}
                </p>
              </div>
              <div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Created At
                </div>
                <p className="font-medium">
                  {new Date(orderDetails?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            {/* <div className="flex items-center justify-between p-4 border-t">
              <Badge variant={getStatusVariant(orderDetails?.status)}>
                {orderDetails?.status?.toUpperCase() || "N/A"}
              </Badge>
              {orderDetails?.note && (
                <p className="text-sm italic text-muted-foreground">Note: {orderDetails.note}</p>
              )}
            </div> */}
          </Card>

          {/* Order Items */}
          <Card className="rounded-lg border shadow-sm mt-4">
            <div className="p-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Receipt className="h-4 w-4" /> Order Items
              </h3>
              <div className="mt-4 space-y-3">
                {(orderDetails?.dishes || []).map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 rounded-md border hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={safeGet(item, "dishId.logo", "/default-logo.png")}
                        alt="Item Logo"
                        className="h-12 w-12 rounded-md object-cover border"
                      />
                      <div>
                        <p className="font-medium">
                          {safeGet(item, "dishId.name", "N/A")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity || 0} ×{" "}
                          {formatPrice(safeGet(item, "dishId.price", 0))}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {formatPrice(
                        (item.quantity || 0) * safeGet(item, "dishId.price", 0)
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end border-t pt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-bold">
                    {formatPrice(
                      (orderDetails?.dishes || []).reduce(
                        (total, item) =>
                          total +
                          (item.quantity || 0) *
                            safeGet(item, "dishId.price", 0),
                        0
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
