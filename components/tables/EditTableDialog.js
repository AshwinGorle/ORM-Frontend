"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateTable } from "@/hooks/table/useUpdateTable";
import { Spinner } from "../ui/spinner";

export function EditTableDialog({ open, onOpenChange, table }) {
  const [sequence, setSequence] = useState("");
  const [capacity, setCapacity] = useState("");
  const [position, setPosition] = useState("");
  // const [status, setStatus] = useState("");

  const { loading: updateTableLoading, handleUpdateTable } = useUpdateTable(onOpenChange);

  useEffect(() => {
    if (table) {
      setPosition(table.position);
      setCapacity(table.capacity.toString());
      setSequence(table.sequence);
    }
  }, [table]);

  const handleClose = () => {
    if (table) {
      setSequence(table?.sequence);
      setCapacity(table?.capacity.toString());
      setPosition(table?.position);
      onOpenChange(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTable = {
      sequence,
      capacity: parseInt(capacity),
      position,
    };
    console.log("table id------------", table._id)
    handleUpdateTable(table._id, updatedTable)
  };

  return (
    <Dialog open={open} onOpenChange={()=>handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Table</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-sequence">Table Number</Label>
            <Input
              id="edit-sequence"
              type="number"
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              placeholder="Enter table sequence"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-capacity">Capacity</Label>
            <Input
              id="edit-capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter table capacity"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-capacity">Table Position</Label>
            <Input
              id="edit-capacity"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter table capacity"
              required
            />
          </div>
          {/* 
          <div className="space-y-2">
            <Label htmlFor="edit-position">Location</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-hall">Main Hall</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="private">Private Area</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button type="submit">
              {updateTableLoading ? <Spinner /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
