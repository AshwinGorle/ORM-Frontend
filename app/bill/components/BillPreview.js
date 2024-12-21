import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Check, Receipt, Clock, Utensils } from "lucide-react";

export function BillPreview({orders}) {
  const allItems = [
    ...(orders?.pending || []),
    ...(orders?.preparing || []),
    ...(orders?.completed || [])
  ].reduce((acc, order) => {
    order.dishes.forEach(dish => {
      const existingItem = acc.find(item => 
        item.dishId?._id === dish.dishId?._id && 
        item.status === order.status
      );
      
      if (existingItem) {
        existingItem.quantity += dish.quantity;
      } else {
        acc.push({ ...dish, status: order.status });
      }
    });
    return acc;
  }, []);

  const tentativeAmount = allItems.reduce((total, item) => {
    return total + (item.quantity * (item.dishId?.price || 0));
  }, 0);

  return (
    <Card className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="bg-gradient-to-r from-gray-50 via-white to-gray-50 p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-gray-900">Bill Preview</CardTitle>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              {allItems.length} items in order
            </p>
          </div>
          <Badge 
            variant="outline" 
            className="px-3 py-1 bg-white border-gray-200 shadow-sm hover:bg-gray-50 transition-colors duration-200"
          >
            <Clock className="w-3 h-3 mr-1" />
            Tentative
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="rounded-lg border border-gray-100 overflow-hidden bg-white shadow-sm">
          <Table className="w-full [&_tr:last-child]:border-0">
            <TableHeader className="bg-gradient-to-r from-gray-50 to-white">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-gray-700">Item</TableHead>
                <TableHead className="text-center font-semibold text-gray-700">Qty</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Price</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allItems.map((item, index) => (
                <TableRow 
                  key={index} 
                  className="hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{item.dishId?.name}</span>
                      {item.status === 'pending' && (
                        <Badge variant="secondary" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200 animate-pulse">
                          Pending
                        </Badge>
                      )}
                      {item.status === 'preparing' && (
                        <Badge variant="warning" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                          Preparing
                        </Badge>
                      )}
                      {item.status === 'completed' && (
                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs animate-fade-in">
                          <Check className="h-3 w-3" />
                          Done
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{item.quantity}</TableCell>
                  <TableCell className="text-right text-gray-600">₹{item.dishId?.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium text-gray-900">
                    ₹{(item.quantity * item.dishId?.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 bg-gradient-to-r from-gray-50 to-white rounded-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-sm text-gray-600">Estimated Total</span>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                ₹{tentativeAmount.toFixed(2)}
              </p>
            </div>
            <Receipt className="h-8 w-8 text-gray-400 transform -rotate-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}