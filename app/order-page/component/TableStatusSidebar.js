import { ScrollArea } from "@/components/ui/scroll-area";
import { TableStatusCard } from "./TableStatusCard";
import { CircleTableView } from "./CircleTableView";
import { TableViewToggle } from "./TableViewToggle";
import { useState } from "react";
import { useGetAllTables } from "@/hooks/table/useGetAllTables";
import { Spinner } from "@/components/ui/spinner";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TableStatusSidebar() {
  const [view, setView] = useState("list");
  const [refresh, setRefresh] = useState(false);
  const { tables, loading } = useGetAllTables({ refresh, setRefresh });

  return (
    <div className="h-full border-l mt-12 ">
      <div className="p-4 border-b bg-white space-y-4">
        <div className="flex gap-4 justify-between">
        <h2 className="text-lg font-semibold">Table Status</h2>
        <Button size="sm" variant="default" onClick={() => setRefresh(true)}>
          {refresh ? <Spinner className="animate-spin" /> : ""}
          <RotateCw/>
        </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {tables?.filter((t) => t.status === "occupied").length} of{" "}
          {tables?.length} tables occupied
        </p>
        <TableViewToggle view={view} onViewChange={setView} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-140px)]">
          <Spinner />
        </div>
      ) : (
        <div className="h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
          <div className="p-4">
            {view === "list" ? (
              <div className="space-y-4">
                {tables?.map((table) => (
                  <TableStatusCard key={table._id} table={table} />
                ))}
              </div>
            ) : (
              <CircleTableView tables={tables} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
