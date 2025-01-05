import { Card } from "@/components/ui/card";
import { MyKanbanCard } from "./MyKanbanCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllTables } from "@/hooks/table/useGetAllTables";

export const TableOrderList = ({ orders, tableId }) => {
  const [openSections, setOpenSections] = useState({
    pending: true,
    preparing: true,
    completed: true
  });

  const tableOrders = {
    pending: [],
    preparing: [],
    completed: [],
  };

  tableOrders.pending = orders.pending?.filter(
    (order) => order.tableId._id.toString() === tableId
  ) || [];

  tableOrders.preparing = orders.preparing?.filter(
    (order) => order.tableId._id.toString() === tableId
  ) || [];

  tableOrders.completed = orders.completed?.filter(
    (order) => order.tableId._id.toString() === tableId
  ) || [];

  const allTables = useGetAllTables();

  const table = allTables.tables.find((table) => table._id === tableId); 

  const tableSequence = table?.sequence ||  "N/A";

  const shortTableId = tableId.slice(-5);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const statusConfig = {
    pending: {
      emoji: "⏳",
      gradient: "from-amber-50 to-white",
      border: "border-amber-100",
      text: "text-amber-700"
    },
    preparing: {
      emoji: "👨‍🍳",
      gradient: "from-blue-50 to-white",
      border: "border-blue-100",
      text: "text-blue-700"
    },
    completed: {
      emoji: "✅",
      gradient: "from-green-50 to-white",
      border: "border-green-100",
      text: "text-green-700"
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="absolute -right-12 top-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-14 py-1 transform rotate-45 shadow-md">
        {/* <span className="text-xs font-medium tracking-wider">#{shortTableId}</span> */}
        <span className="text-xs font-medium tracking-wider">
          {tableSequence === "N/A" ? "#" +shortTableId : "Table #" + tableSequence}
        
          </span>

      </div>

      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <span>🍽️ Table Orders</span>
          <span className="text-sm text-gray-500 font-normal">
            ({Object.values(tableOrders).reduce((acc, curr) => acc + curr.length, 0)} total)
          </span>
        </h2>

        <div className="space-y-4">
          {Object.entries(tableOrders).map(([status, orders]) => (
            <Card 
              key={status}
              className={`bg-gradient-to-br ${statusConfig[status].gradient} border ${statusConfig[status].border} shadow-sm overflow-hidden`}
            >
              <button
                onClick={() => toggleSection(status)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{statusConfig[status].emoji}</span>
                  <h3 className={`text-sm font-medium ${statusConfig[status].text}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)} Orders ({orders.length})
                  </h3>
                </div>
                {openSections[status] ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {openSections[status] && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0">
                      {orders.length > 0 ? (
                        <div className="space-y-2">
                          {orders.map((order) => (
                            <MyKanbanCard key={order._id} order={order} />
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No {status} orders
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
