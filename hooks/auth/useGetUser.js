import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { categoryActions } from "@/redux/slices/categorySlice";
import { getUser } from "@/redux/actions/auth";
import { authActions } from "@/redux/slices/authSlice";
import { ownerActions } from "@/redux/slices/ownerSlice";


export const useGetUser = () => {
    const params = {}
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const profileRefresh = useSelector((state)=>state.owner.profileRefresh);
    const { status, error, data } = useSelector((state) => state.auth.getUser); 
    const { toast } = useToast();

    const fetchUser = useCallback(() => {
        if (!data || profileRefresh) {
            dispatch(getUser());
            dispatch(ownerActions.setProfileRefresh(false));
        }
    }, [dispatch, data, profileRefresh]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser, profileRefresh]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            
            // toast({
            //     title: "Success",
            //     description: "Users fetched successfully.",
            //     variant: "success",
            // });
            dispatch(authActions.clearGetUserStatus());
            dispatch(authActions.clearGetUserError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch Users.",
                variant: "destructive",
            });
            dispatch(authActions.clearGetUserStatus());
            dispatch(authActions.clearGetUserError());
        }
    }, [status, data, error, dispatch]);

    const transformedUsers = useMemo(() => {
        return data?.user || null;
    }, [data]);

    return { user: transformedUsers, loading };
};
