import { useEffect, useRef } from 'react';
import * as Ably from 'ably';
import { useDispatch } from 'react-redux';


import { setConnectionStatus, setConnectionError, clearConnectionError } from '@/redux/slices/connectionSlice';
import axios from 'axios';
import { getBaseUrl } from '@/utils/api-config';
import { orderActions } from '@/redux/slices/orderSlice';

const useAbly = (hotelId, isSystemOnline) => {
  const dispatch = useDispatch();
  const channelRef = useRef(null);
  const ablyRef = useRef(null);

  useEffect(() => {
    let channelName = `hotel-${hotelId}`;
    const setupAbly = async () => {
      if (!isSystemOnline || !hotelId) {
        dispatch(setConnectionStatus(false));
        console.log('System going offline or no hotelId provided');
        cleanup();
        return;
      }

      try {
        if (!ablyRef.current) {
          ablyRef.current = new Ably.Realtime({
            key: "iM-CAA.oboaUA:UQwMetw5fRcV_bnUCAskfL1iY4VpiWr-D4KmPE0_Cdg",
            clientId: channelName,
            closeOnUnload: true,
            disconnectedRetryTimeout: 5000,
            suspendedRetryTimeout: 10000,
          });

          ablyRef.current.connection.on('connected', () => {
            console.log('Ably connection established successfully');
            dispatch(setConnectionStatus(true));
            dispatch(clearConnectionError());
          });

          ablyRef.current.connection.on('failed', (error) => {
            console.error('Ably connection failed:', error);
            dispatch(setConnectionError(error.message));
          });

          ablyRef.current.connection.on('disconnected', () => {
            console.log('Ably connection disconnected');
            dispatch(setConnectionStatus(false));
          });
        }

        if (!channelRef.current) {
          channelRef.current = ablyRef.current.channels.get(channelName);
          console.log(`Subscribed to channel: ${channelName}`);
          channelRef.current.subscribe('new-order', async (message) => {
            console.log('New individual order received :', message.data);
            const orderData = message.data;
            if (orderData && orderData.orderId) {
              try {
                // Fetch complete order details
                const response = await axios.get(
                  `${getBaseUrl()}/orders/details/${orderData.orderId}`,
                  {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                  }
                );
                if (response.data.success) {
                  const completeOrderData = response.data.data.order;
                  dispatch(orderActions.setNewOrder(completeOrderData));
                }
              } catch (error) {
                console.error('Error fetching complete order details:', error);
              }
            }
          });

          channelRef.current.subscribe('order-update', (message) => {
            console.log('Order sync received:', message.data);
            if (message.data && message.data.orders) {
              const formattedOrders = {
                new: message.data.orders.new || [],
                inProgress: message.data.orders.inProgress || [],
                completed: message.data.orders.completed || []
              };
              dispatch(orderActions.syncOrders(formattedOrders));
            }
          });
        }
      } catch (error) {
        dispatch(setConnectionError(error.message));
      }
    };

    const cleanup = () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      if (ablyRef.current) {
        try {
          ablyRef.current.close();
        } catch (error) {
          console.error('Error closing Ably connection:', error);
        }
        ablyRef.current = null;
      }
    };

    setupAbly();

    return () => cleanup();
  }, [hotelId, isSystemOnline, dispatch]);

  return { channel: channelRef.current };
};

export default useAbly;
