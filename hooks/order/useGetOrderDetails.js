import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { getBaseUrl, getCurrentServer, setCurrentServer } from '@/utils/api-config';

export const useGetOrderDetails = () => {
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedServer, setSelectedServer] = useState(getCurrentServer());
  const { toast } = useToast();

  const fetchOrderDetails = async (orderId) => {
    setLoading(true);
    try {
      console.log('Fetching from:', getBaseUrl());
      const response = await axios.get(
        `${getBaseUrl()}/orders/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setOrderDetails(response.data.data.orderDetails);
        toast({
          title: "Success",
          description: "Order details fetched successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to fetch order details",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch order details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleServer = () => {
    const newServer = selectedServer === 'local' ? 'deployed' : 'local';
    setSelectedServer(newServer);
    setCurrentServer(newServer);
  };

  return { 
    loading, 
    orderDetails, 
    fetchOrderDetails, 
    selectedServer,
    toggleServer 
  };
}; 