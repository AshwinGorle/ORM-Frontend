import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function CircleTableView({ tables }) {
  const router = useRouter();

  const getStatusColor = (status) => {
    return {
      free: "bg-green-500 hover:bg-green-600",
      occupied: "bg-red-500 hover:bg-red-600",
    }[status] || "bg-gray-500 hover:bg-gray-600";
  };

  const handleTableClick = (tableId) => {
    router.push(`/bill/table/${tableId}`);
  };

  const groupedTables = tables?.reduce((acc, table) => {
    const position = table.position || 'Other';
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(table);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Legend Section */}
      <div className="flex gap-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">Free</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-600">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-500"></div>
          <span className="text-sm text-gray-600">Unknown</span>
        </div>
      </div>

      {/* Existing table groups */}
      {Object.entries(groupedTables || {}).map(([position, positionTables]) => (
        <div key={position} className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 px-2">{position}</h3>
          <div className="grid grid-cols-4 gap-3 justify-items-center">
            {positionTables.map((table) => (
              <button
                key={table._id}
                onClick={() => handleTableClick(table._id)}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center text-white font-medium text-sm",
                  getStatusColor(table.status)
                )}
              >
                {table.sequence}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 