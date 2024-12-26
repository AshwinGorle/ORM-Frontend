// "use client";

// import { useRouter } from "next/navigation";
// import { QrCode, UtensilsCrossed, Table2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// const adminConfigItems = [
//   {
//     title: "Manage Owners",
//     icon: UtensilsCrossed,
//     description: "Manage restaurant owners",
//     href: "/admin-dashboard/owners",
//   },
//   {
//     title: "Manage Hotels",
//     icon: Table2,
//     description: "Configure Manage Hotels setting",
//     href: "/admin-dashboard/hotels",
//   },
//   {
//     title: "QR Codes",
//     icon: QrCode,
//     description: "Generate and manage QR codes",
//     href: "/dashboard/configuration/qr-codes",
//   },
// ];

// export default function AdminConfigurationMenu() {
//   const router = useRouter();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//       {adminConfigItems.map((item) => (
//         <Card key={item.href} className="hover:shadow-lg transition-shadow">
//           <CardContent className="p-6">
//             <div className="flex flex-col items-center text-center space-y-4">
//               <div className="p-3 bg-primary/10 rounded-full">
//                 <item.icon className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-lg font-semibold">{item.title}</h3>
//               <p className="text-sm text-muted-foreground">
//                 {item.description}
//               </p>
//               <Button 
//                 className="w-full" 
//                 variant="outline"
//                 onClick={() => router.push(item.href)}
//               >
//                 {item.title}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }



// showing just Manage owner

'use client';

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming shadcn includes these components
import { Button } from "@/components/ui/button"; // Assuming this is the correct path for buttons
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner"; // Assuming Spinner for loading indication
import { useGetAllOwners } from "@/hooks/owner/useGetAllOwners";
import { useApproveOwner } from "@/hooks/owner/useApproveOwner";
import { useExtendOwnerMembership } from "@/hooks/owner/useExtendOwnerMembership";
import { DialogTitle } from "@radix-ui/react-dialog";
import getExpiryTimeInWords from "@/utils/getExpiryInWords";

export default function UserList() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [extendDays, setExtendDays] = useState(null);
  
  const { loading, owners } = useGetAllOwners();

  const [approvingItemId, setApprovingItemId] = useState(null);
  const {loading : approveLoading, handleApproveOwner} = useApproveOwner(setApprovingItemId);
  
  const {loading : extendOwnerMembershipLoading, handleExtendOwnerMembership} = useExtendOwnerMembership(setSelectedUserId);

  // const [extendOwnerMembershipLoading, setLoadingExtend] = useState(null);

   console.log("owners in the comp ", owners)
  

  const handleApprove = async (id) => {
    setApprovingItemId(id);
    handleApproveOwner(id);    
  };
 
  const handleExtendMembership = async () => {
    if (!selectedUserId || !extendDays)  return;
    handleExtendOwnerMembership(selectedUserId,extendDays);
    // setExtendDays(null);
  };

  return (
    <Table>
      <TableCaption>A list of user details and actions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Is Approved</TableHead>
          <TableHead>Membership Expires</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              <Spinner size="lg" />
            </TableCell>
          </TableRow>
        ) : owners
        ?.length ? (
          owners.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.isApproved ? "Yes" : "No"}</TableCell>
              <TableCell>{getExpiryTimeInWords(user.membershipExpires) || "N/A"}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleApprove(user._id)}
                    disabled={approvingItemId == user._id.toString()}
                    
                  >
                    {approvingItemId == user._id.toString() ? <Spinner size="sm" /> : "Approve Owner"}
                  </Button>
                  <Dialog open={selectedUserId ? true : false}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedUserId(user._id)}>
                        Extend Membership
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Extend Membership header</DialogTitle>
                        <h2 className="text-xl font-bold">Extend Membership---</h2>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          type="number"
                          placeholder="Enter number of days"
                          value={extendDays || ""}
                          onChange={(e) => setExtendDays(parseInt(e.target.value, 10))}
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="secondary" onClick={() => setSelectedUserId(null)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={handleExtendMembership}
                          disabled={extendOwnerMembershipLoading}
                        >
                          {extendOwnerMembershipLoading ? <Spinner size="sm" /> : "Submit"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No owners available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className="text-right font-semibold">
            Total Users: {owners?.length || 0}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
