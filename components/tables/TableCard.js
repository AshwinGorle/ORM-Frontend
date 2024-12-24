"use client";

import { MoreVertical, Download, Users, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TableStatusToggle from "./TableStatusToggle";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import { printQr } from "@/redux/actions/qr/qrAction";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

// ye 2 import chirag ne kare hai : for new download button for QR 
// CODE
import { QrCode } from "lucide-react";
import QRCodeModal from "./QRCodeModal";

// mock data for qrcode
const mockQrData = {
  message: "QR Code Generated",
  qrCodeImage: {
    imageUrl: "data:image/png;base64,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"
  },
  tableNumber: 6,
  hotelName: "Aswin Ow's Hotel",
  tableId: "67652c2193596bb4eb953d31",
  hotelId: "6765297893596bb4eb953cba"
};


export default function TableCard({ table, onStatusChange, onEdit, onDelete }) {
  const dispatch = useDispatch();
  const [qrLoading, setQrLoading] = useState(null);

  // state varaible for QR code modal
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const downloadQR = (tableId) => {
    console.log("QR code downloader tableID : ", tableId);
    dispatch(printQr(tableId, setQrLoading));
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      <div className={`absolute inset-0 w-1 ${table.status === 'free' ? 'bg-green-500' : 'bg-red-500'}`} />
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pl-6">
        <div className="space-y-1">
          <h3 className="font-semibold text-xl tracking-tight">{table.sequence}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3" />
            {table.capacity} People
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onEdit(table)}>
              Edit Table
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(table)}
              className="text-red-600 focus:text-red-600"
            >
              Delete Table
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4 pl-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {table?.position?.replace("-", " ")}
          </Badge>
        </div>
        
        <TableStatusToggle 
          status={table.status} 
          onStatusChange={(newStatus) => onStatusChange(table.id, newStatus)} 
        />

          {/* ye hai naya QR CODE download button */}
          <Button 
              className="w-full mt-4"
              variant="outline"
              onClick={() => setIsQrModalOpen(true)}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>


        <Button
          variant="outline"
          size="sm"
          className="w-full group-hover:border-primary/50 transition-colors"
          onClick={()=>downloadQR(table._id)}
        >
          <Download className="h-4 w-4 mr-2" />
          { qrLoading == table._id.toString() ? <Spinner/> : "Download QR" }
        </Button>
      </CardContent>

          <QRCodeModal
            open={isQrModalOpen}
            onOpenChange={setIsQrModalOpen}
            qrData={mockQrData}
          />
    </Card>

    
  );
}