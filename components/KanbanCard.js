"use client"
import React, { useState } from 'react';
import { OrderDetailsDialog } from './orders/OrderDetailsDialog';
import { useGetOrderDetails } from '@/hooks/order/useGetOrderDetails';

function KanbanCard({ order, actions }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { loading, orderDetails, fetchOrderDetails } = useGetOrderDetails();

  if (!order || !order.orderId) {
    return null;
  }

  const handleCardClick = async () => {
    setIsDetailsOpen(true);
    await fetchOrderDetails(order.orderId);
  };

  const handleDialogChange = (open) => {
    if (!open) {
      setIsDetailsOpen(false);
    }
  };

  return (
    <>
      <div 
        className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleCardClick}
      >
        <h3 className="text-lg font-medium mb-2">
          {`Order #${order.orderId.slice(-6) || 'N/A'}`}
        </h3>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">{`Bill-ID: ${order.bill?._id || 'N/A'}`}</p>
          <p className="text-sm text-gray-600">{`Status: ${order.status || 'N/A'}`}</p>
          <p className="text-sm text-gray-600">{`Table: ${order.table?._id || 'N/A'}`}</p>
          <p className="text-sm text-gray-600">{`Customer: ${order.customer?.name || 'N/A'}`}</p>
          <div className="border-t pt-2">
            <p className="text-sm font-medium mb-1">Dishes:</p>
            {order.dishes?.map((dish, index) => (
              <p key={`${order.orderId}-dish-${index}`} className="text-sm text-gray-600">
                {`${dish.quantity}x ${dish.name} (₹${dish.price})`}
              </p>
            ))}
          </div>
        </div>
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          {actions?.map((action, index) => (
            <button
              key={`${order.orderId}-action-${index}`}
              onClick={() => action.onClick(order.orderId)}
              className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <OrderDetailsDialog
        open={isDetailsOpen}
        onOpenChange={handleDialogChange}
        orderDetails={orderDetails}
        loading={loading}
      />
    </>
  );
}

export default KanbanCard;