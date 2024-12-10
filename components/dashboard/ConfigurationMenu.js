"use client";

import { useRouter } from "next/navigation";
import { QrCode, UtensilsCrossed, Table2 , NotepadText} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const configItems = [
  {
    title: "Dishes",
    icon: UtensilsCrossed,
    description: "Manage restaurant dishes and menu items",
    href: "/dashboard/configuration/dishes",
  },
  {
    title: "Tables",
    icon: Table2,
    description: "Configure restaurant tables and seating",
    href: "/dashboard/configuration/tables",
  },
  {
    title: "QR Codes",
    icon: QrCode,
    description: "Generate and manage QR codes",
    href: "/dashboard/configuration/qr-codes",
  },
  {
    title: "Ingredients",
    icon: NotepadText,
    description: "Add and Manage ingredients for dishes",
    href: "/dashboard/configuration/ingredients",
  },
];

export default function ConfigurationMenu() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {configItems.map((item) => (
        <Card key={item.href} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => router.push(item.href)}
              >
                Manage {item.title}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}