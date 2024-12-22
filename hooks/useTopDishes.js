"use client";

import { useState, useEffect } from "react";

// Mock data generator for demonstration
const generateMockDishes = () => {
  const dishes = [
    "Butter Chicken",
    "Paneer Tikka",
    "Dal Makhani",
    "Biryani",
    "Naan",
    "Tandoori Roti",
    "Malai Kofta",
    "Palak Paneer",
    "Chicken Tikka",
    "Gulab Jamun"
  ].map((name, id) => {
    const orderCount = Math.floor(Math.random() * 500) + 100;
    const avgPrice = Math.floor(Math.random() * 400) + 100;
    return {
      id: id + 1,
      name,
      orderCount,
      revenue: orderCount * avgPrice
    };
  });

  return dishes.sort((a, b) => b.revenue - a.revenue);
};

export function useTopDishes() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // In a real application, this would be an API call
    setDishes(generateMockDishes());
  }, []);

  return { dishes };
}