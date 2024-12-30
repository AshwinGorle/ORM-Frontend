// import { useState, useEffect, useCallback, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useToast } from "@/hooks/use-toast";
// import { tableActions } from "@/redux/slices/tableSlice";
// import { getAllTables } from "@/redux/actions/table";

// export const useGetAllTables = (params = {}) => {
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();
//     const { refresh = false, setRefresh = null } = params;

//     const { status, error, data } = useSelector((state) => state.table.getAllTables);
//     const { toast } = useToast();

//     const fetchAllTables = useCallback(() => {
//         if (!data || refresh) {
//             dispatch(getAllTables());
//         }
//     }, [dispatch, data, refresh]);

//     useEffect(() => {
//         fetchAllTables();
//     }, [fetchAllTables]);

//     const handleStatusChange = useCallback(() => {
//         if (status === "pending") {
//             setLoading(true);
//         } else if (status === "success") {
//             setLoading(false);
//             if (setRefresh) {
//                 setRefresh(false);
//             }
//             toast({
//                 title: "Success",
//                 description: "Tables fetched successfully.",
//                 variant: "success",
//             });
//             dispatch(tableActions.clearGetAllTablesStatus());
//             dispatch(tableActions.clearGetAllTablesError());
//         } else if (status === "failed") {
//             setLoading(false);
//             toast({
//                 title: "Error",
//                 description: error || "Failed to Fetch Tables.",
//                 variant: "destructive",
//             });
//             dispatch(tableActions.clearGetAllTablesStatus());
//             dispatch(tableActions.clearGetAllTablesError());
//         }
//     }, [status, error, dispatch, setRefresh, toast]);

//     useEffect(() => {
//         handleStatusChange();
//     }, [handleStatusChange]);

//     const transformedTables = useMemo(() => {
//         return data?.tables || [];
//     }, [data]);

//     return { tables: transformedTables, loading };
// };

import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { tableActions } from "@/redux/slices/tableSlice";
import { getAllTables } from "@/redux/actions/table";

export const useGetAllTables = (params = {}) => {
  const { refresh = false, setRefresh } = params;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Using shallowEqual to prevent unnecessary re-renders due to object reference changes
  const { status, error, data } = useSelector(
    (state) => state.table.getAllTables,
    shallowEqual
  );

  const { toast } = useToast();

  // Fetch tables only when necessary
  const fetchAllTables = useCallback(() => {
    if (refresh || !data) {
      dispatch(getAllTables());
    }
  }, [dispatch, data, refresh]);

  // Trigger fetch effect on mount or refresh
  useEffect(() => {
    if (refresh || !data) {
      fetchAllTables();
      if(setRefresh) setRefresh(false);
    }
  }, [fetchAllTables, refresh]);

  // Handle status and errors without triggering state changes during rendering
  useEffect(() => {
    let timeout;
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      timeout = setTimeout(() => {
        setLoading(false);
        toast({
          title: "Success",
          description: "Tables fetched successfully.",
          variant: "success",
        });
        dispatch(tableActions.clearGetAllTablesStatus());
        dispatch(tableActions.clearGetAllTablesError());
      }, 0);
    } else if (status === "failed") {
      timeout = setTimeout(() => {
        setLoading(false);
        toast({
          title: "Error",
          description: error || "Failed to Fetch Tables.",
          variant: "destructive",
        });
        dispatch(tableActions.clearGetAllTablesStatus());
        dispatch(tableActions.clearGetAllTablesError());
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [status, error, dispatch]);

  // Transform data
  const transformedTables = useMemo(() => {
    return data?.tables || [];
  }, [data]);

  return { tables: transformedTables, loading };
};
