import { ScrollArea } from "@/components/ui/scroll-area";
import { TableStatusCard } from "./TableStatusCard";
import { CircleTableView } from "./CircleTableView";
import { TableViewToggle } from "./TableViewToggle";
import { useState } from "react";
import { useGetAllTables } from "@/hooks/table/useGetAllTables";
import { Spinner } from "@/components/ui/spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TableStatusSidebar() {
  const [view, setView] = useState('list');
  const { tables, loading } = useGetAllTables();
  
  return (
    <div className="h-full">
      <div className="p-4 border-b bg-white space-y-4">
        <h2 className="text-lg font-semibold">Table Status</h2>
        <p className="text-sm text-muted-foreground">
          {tables?.filter(t => t.status === "occupied").length} of {tables?.length} tables occupied
        </p>
        <TableViewToggle view={view} onViewChange={setView} />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-140px)]">
          <Spinner />
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="p-4">
            {view === 'list' ? (
              <div className="space-y-4">
                {tables?.map(table => (
                  <TableStatusCard key={table._id} table={table} />
                ))}
              </div>
            ) : (
              <CircleTableView tables={tables} />
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
} 