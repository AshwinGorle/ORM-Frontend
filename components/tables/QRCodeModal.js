"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { usePrint } from "./print/usePrint";
import { useSelector } from "react-redux";
import { Spinner } from "../ui/spinner";

export default function QRCodeModal({ open, onOpenChange, tableId, qrLoading }) {
  const { printQRCode } = usePrint();
  const qrData = useSelector((state) => state.qr.getQr.data);

  if (!qrData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Table QR Code</DialogTitle>
        </DialogHeader>
        {qrLoading ? (
          <div className="flex items-center justify-center h-48">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-2 text-sm">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-muted-foreground">Hotel Name:</div>
                <div className="font-medium">{qrData.hotelName}</div>
                
                <div className="text-muted-foreground">Table Number:</div>
                <div className="font-medium">{qrData.tableNumber}</div>
                
                <div className="text-muted-foreground">Table ID:</div>
                <div className="font-medium truncate">{qrData.tableId}</div>
                
                <div className="text-muted-foreground">Hotel ID:</div>
                <div className="font-medium truncate">{qrData.hotelId}</div>
              </div>
            </div>

            <div className="relative aspect-square w-full max-w-[300px] mx-auto border rounded-lg overflow-hidden">
              <Image
                src={qrData.qrCodeImage.imageUrl}
                alt="QR Code"
                fill
                className="object-contain p-4"
              />
            </div>

            <Button 
              className="w-full" 
              onClick={() => printQRCode(qrData)}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print QR Code
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}