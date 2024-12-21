import { LayoutGrid, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TableViewToggle({ view, onViewChange }) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
      <Button
        variant={view === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="flex-1 flex items-center justify-center gap-2 min-w-[120px]"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">List View</span>
      </Button>
      <Button
        variant={view === 'circle' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('circle')}
        className="flex-1 flex items-center justify-center gap-2 min-w-[120px]"
      >
        <CircleDot className="h-4 w-4" />
        <span className="hidden sm:inline">Circle View</span>
      </Button>
    </div>
  );
} 