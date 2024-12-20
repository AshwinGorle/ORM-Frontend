"use client";

import { useState } from "react";

export function useOrders() {
  const [orders, setOrders] = useState([]);

  const addToOrder = (dish, quantity) => {
    setOrders(prevOrders => {
      const existingOrder = prevOrders.find(order => order.dish.id === dish.id);
      if (existingOrder) {
        return prevOrders.map(order =>
          order.dish.id === dish.id
            ? { ...order, quantity: order.quantity + quantity }
            : order
        );
      }
      return [...prevOrders, { dish, quantity }];
    });
  };

  const updateQuantity = (dishId, newQuantity) => {
    if (newQuantity < 1) return;
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.dish.id === dishId
          ? { ...order, quantity: newQuantity }
          : order
      )
    );
  };

  const removeItem = (dishId) => {
    setOrders(prevOrders => prevOrders.filter(order => order.dish.id !== dishId));
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const getTotalItems = () => {
    return orders.reduce((total, order) => total + order.quantity, 0);
  };

  return {
    orders,
    addToOrder,
    updateQuantity,
    removeItem,
    clearOrders,
    getTotalItems
  };
}