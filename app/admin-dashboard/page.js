

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
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export default function UserList() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [extendDays, setExtendDays] = useState(null);
  
  const { loading, owners } = useGetAllOwners();

  const [approvingItemId, setApprovingItemId] = useState(null);
  const {loading : approveLoading, handleApproveOwner} = useApproveOwner(setApprovingItemId);
  
  const {loading : extendOwnerMembershipLoading, handleExtendOwnerMembership} = useExtendOwnerMembership(setSelectedUserId);

  // const [extendOwnerMembershipLoading, setLoadingExtend] = useState(null);

  const route = `${process.env.NEXT_PUBLIC_SERVER_URL}/users`;

   console.log("owners in the comp ", owners)
  

  const handleApprove = async (id) => {
    setApprovingItemId(id);
    handleApproveOwner(id);    
  };
 
  const handleExtendMembership = async () => {
    console.log( "extend days : ", extendDays)
    // if (extendDays != 0 || !selectedUserId || !extendDays)  return;
    handleExtendOwnerMembership(selectedUserId,extendDays);
    // setExtendDays(null);
  };

  const sendMailHandler =  async (hotelOwnerId) => {
    console.log("hotelOwnerId ", hotelOwnerId);
    console.log("route ", route)
    try{
        const res = await axios.get(`${route}/send-email-membership-expired/${hotelOwnerId}`, 
          {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("res ", res)
        

        if(res.data.status=="success"){
          toast
          ({
            title: "Success",
            description: "Email sent successfully.",
            variant: "success",
          });
        }
        else{
          toast
          ({
            title: "Error",
            description: "Failed to send email.",
            variant: "destructive",
          });
        }
    }
    catch(error){
      console.log("error ", error)
      toast
      ({
        title: "Error",
        description: "Failed to send email.",
        variant: "destructive",
      });
    }
  }

 console.log("date now ", Date.now())
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
              <TableCell>
                {
                   (new Date(user.membershipExpires) > Date.now()) ? 
                   getExpiryTimeInWords(user.membershipExpires) 
                   : <Button variant="destructive" onClick={() => sendMailHandler(user._id)}>Expired - send mail</Button>
                }
                </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleApprove(user._id)}
                    disabled={approvingItemId == user._id.toString()}
                    
                  >
                    {approvingItemId == user._id.toString() ? <Spinner size="sm" /> : (user.isApproved ? "Reject Owner" :" Approve Owner")}
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
                          value={extendDays || 0}
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
