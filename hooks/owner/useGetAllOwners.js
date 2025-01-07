import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ownerActions } from "@/redux/slices/ownerSlice";
import { getAllHotelOwners } from "@/redux/actions/auth";

export const useGetAllOwners = (params = {}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { refresh = false, setRefresh = null } = params;

  const { status, error, data } = useSelector((state) => state.owner.getAllOwners); // Directly use this
  const { toast } = useToast();

  const fetchAllOwners = useCallback(() => {
    if (!data || refresh) {
      dispatch(getAllHotelOwners());
  
    }
  }, [dispatch, data, refresh]);

  useEffect(() => {
    fetchAllOwners();

  }, [fetchAllOwners]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setRefresh && setRefresh(false);
      toast({
        title: "Success",
        description: "Hotel Owners fetched successfully.",
        variant: "success",
      });
      dispatch(ownerActions.clearGetAllOwnersStatus());
      dispatch(ownerActions.clearGetAllOwnersError());
    } else if (status === "failed") {
      setLoading(false);
      toast({
        title: "Error",
        description: error || "Failed to Fetch Hotel Owners.",
        variant: "destructive",
      });
      dispatch(ownerActions.clearGetAllOwnersStatus());
      dispatch(ownerActions.clearGetAllOwnersError());
    }
  }, [status, data, error, dispatch, toast, setRefresh]);

  const transformedOwners = useMemo(() => {
    return [...(data?.hotelOwners || [])].sort((a, b) => {
      // Ensure membershipExpires is parsed as a Date before comparing
      const dateA = new Date(a.membershipExpires);
      const dateB = new Date(b.membershipExpires);
      return dateA - dateB; // Sort in ascending order
    });
  }, [data]);

  return { owners: transformedOwners ?? [], loading };
};
