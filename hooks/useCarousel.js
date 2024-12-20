"use client";

import { useState, useEffect, useRef } from "react";

export default function useCarousel(totalSlides, autoPlayInterval = 5000) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) =>
        prev === totalSlides - 1 ? 0 : prev + 1
      );
    }, autoPlayInterval);

    return () => resetTimeout();
  }, [currentSlide, totalSlides, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  return {
    currentSlide,
    setCurrentSlide,
    nextSlide,
    prevSlide
  };
}