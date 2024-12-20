"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function TableStatusToggle({ status, onStatusChange }) {
  return (
    <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/50 hover:border-border transition-colors">
      <Label htmlFor="table-status" className="text-sm font-medium cursor-pointer">
        Table Status
      </Label>
      <div className="flex items-center gap-3">
        <span className={`text-sm transition-colors ${
          status === 'free' 
            ? 'text-green-600 font-medium' 
            : 'text-muted-foreground'
        }`}>
          Free
        </span>
        <Switch
          id="table-status"
          checked={status === 'occupied'}
          onCheckedChange={(checked) => onStatusChange(checked ? 'occupied' : 'free')}
          className="data-[state=checked]:bg-red-500 transition-colors"
        />
        <span className={`text-sm transition-colors ${
          status === 'occupied' 
            ? 'text-red-600 font-medium' 
            : 'text-muted-foreground'
        }`}>
          Occupied
        </span>
      </div>
    </div>
  );
}