import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ownerActions } from "@/redux/slices/ownerSlice";
import { getAllHotelOwners } from "@/redux/actions/auth";

export const useGetAllOwners = (params = {}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { refresh = false, setRefresh = null } = params;

  const { status, error, data } = useSelector((state) => state.owner.getAllOwners);
  const [owners, setOwners] = useState(data?.data);
  const { toast } = useToast();

  // Fetch all owners if required
  const fetchAllOwners = useCallback(() => {
    if (!data || refresh) {
      dispatch(getAllHotelOwners());
    }
  }, [dispatch, data, refresh]);

  // Fetch owners on mount or when refresh is triggered
  useEffect(() => {
    fetchAllOwners();
  }, [fetchAllOwners]);

  // Handle status changes
  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data?.status === "success") {
      setOwners(data?.data);
      setLoading(false);
      setRefresh && setRefresh(false);
      toast({
        title: "Success",
        description: "Hotel Owners fetched successfully.",
        variant: "success",
      });
      dispatch(ownerActions.clearGetAllOwnersStatus());
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

  // Transform owners data for easier usage in components
  const transformedOwners = useMemo(() => {
    return owners?.map(({ _id, name, email }) => ({
      value: _id,
      label: `${name} (${email})`,
    }));
  }, [owners]);

  return { owners: transformedOwners ?? [], loading, fetchAllOwners };
};
