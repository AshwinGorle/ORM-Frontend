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

export default function TableCard({ table, onStatusChange, onEdit, onDelete }) {
  const dispatch = useDispatch();
  const [qrLoading, setQrLoading] = useState(null);
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
    </Card>
  );
}