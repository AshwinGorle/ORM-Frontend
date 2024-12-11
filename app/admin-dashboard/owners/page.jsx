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

   console.log("owners in the comp ", owners
    )
  

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
