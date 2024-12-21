import { Card } from "@/components/ui/card";
import { Circle, Users, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function TableStatusCard({ table }) {
  const router = useRouter();
  const statusStyles = {
    free: "text-green-500",
    occupied: "text-red-500",
  };

  const handleTableClick = () => {
    router.push(`/bill/table/${table._id}`);
  };

  return (
    <Card 
      className="p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleTableClick}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Table {table.sequence}</h3>
        <div className="flex items-center gap-2">
          <Circle 
            className={cn("h-3 w-3 fill-current", statusStyles[table.status])} 
          />
          <span className={cn("text-sm capitalize", statusStyles[table.status])}>
            {table.status}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Capacity: {table.capacity} people</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{table.position}</span>
        </div>
      </div>
    </Card>
  );
} 