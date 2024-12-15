import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

export const useGetOrderDetails = () => {
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const { toast } = useToast();

  const fetchOrderDetails = async (orderId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/orders/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setOrderDetails(response.data.data.orderDetails);
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to fetch order details",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch order details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, orderDetails, fetchOrderDetails };
}; 