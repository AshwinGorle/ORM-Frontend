import { setSystemOnline } from "../../slices/systemSlice";
import { setNewOrder } from "../../slices/orderSlice"; // Action to store orders

// Action to connect to Ably and subscribe to messages
export const connectToAbly = (ably, channelName, dispatch) => {
  const channel = ably.channels.get(channelName);

  // Subscribe to incoming messages (e.g., new orders)
  channel.subscribe((message) => {
    console.log('New message received:', message);
    const order = message.data; // Assuming message.data contains the order
    dispatch(setNewOrder(order)); // Dispatch new order to Redux store
  });

  dispatch(setSystemOnline(true)); // Set system as online
};

// Action to disconnect from Ably and unsubscribe from the channel
export const disconnectFromAbly = (ably, channelName, dispatch) => {
  const channel = ably.channels.get(channelName);

  channel.unsubscribe(); // Unsubscribe from the channel
  dispatch(setSystemOnline(false)); // Set system as offline
};
