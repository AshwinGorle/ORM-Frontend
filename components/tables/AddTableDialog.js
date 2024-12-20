"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import QRCode from "qrcode";

export function AddTableDialog({ open, onOpenChange, onAdd }) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("main-hall");
  const [qrCode, setQrCode] = useState("");

  const generateQR = async (tableData) => {
    console.log("generae qrcode function");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tableData = {
      name,
      capacity: parseInt(capacity),
      location,
      status: "free",
    };
    
    const qrCodeUrl = await generateQR(tableData);
    
    onAdd({ ...tableData, qrCode: qrCodeUrl });
    setName("");
    setCapacity("");
    setLocation("main-hall");
    setQrCode("");
  };

  const downloadQR = async () => {
    if (!name || !capacity) {
      alert("Please fill in table details first");
      return;
    }

    const qrCodeUrl = await generateQR({
      name,
      capacity: parseInt(capacity),
      location,
    });

    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `table-${name}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Table</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Table Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter table name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter table capacity"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-hall">Main Hall</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="private">Private Area</SelectItem>
                <SelectItem value="roof">Roof Top</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={downloadQR}
          >
            Download QR Code
          </Button>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Table</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}