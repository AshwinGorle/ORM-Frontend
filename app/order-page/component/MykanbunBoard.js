import React from 'react';
import { MyKanbanColumn } from './MyKanbanColumn';

export function MyKanbanBoard({orders}) {

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 overflow-x-auto">
      {/* <MyKanbanColumn title="Draft" orders={orders.draft} /> */}
      <MyKanbanColumn title="Pending" orders={orders.pending} />
      <MyKanbanColumn title="Preparing" orders={orders.preparing} />
      <MyKanbanColumn title="Completed" orders={orders.completed} />
    </div>
  );
}

