import { useEffect, useRef } from 'react';
import * as Ably from 'ably';
import { useDispatch } from 'react-redux';
import { setNewOrder, syncOrders } from '@/redux/slices/orderSlice';
import { setConnectionStatus, setConnectionError, clearConnectionError } from '@/redux/slices/connectionSlice';

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
          
          channelRef.current.subscribe('new-order', (message) => {
            console.log('New individual order received:', message.data);
            const orderData = message.data;
            
            if (orderData && orderData.orderId) {
              console.log('Dispatching new order:', orderData);
              dispatch(setNewOrder({
                orderId: orderData.orderId,
                status: orderData.status || 'new',
                ...orderData
              }));
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
              dispatch(syncOrders(formattedOrders));
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
