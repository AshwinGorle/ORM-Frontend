// components/KanbanColumn.js
import React from 'react';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ title, badgeColor, orders = [], actions = [] }) => {
  const cardList = orders?.filter(order => order && order.orderId) || [];

  return (
    <div className="flex-1 min-h-[600px] bg-gray-50 p-4 rounded-lg">
      <h2 className={`text-xl font-semibold mb-4 text-${badgeColor}-500`}>{title}</h2>
      <div className="space-y-4">
        {cardList.length > 0 ? (
          cardList.map((order) => (
            <KanbanCard 
              key={`kanban-card-${order.orderId}`}
              order={order} 
              actions={actions}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No orders available.</p>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
