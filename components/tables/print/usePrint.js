"use client";

import { useCallback } from "react";
import { generatePrintTemplate } from "./PrintTemplate";

export const usePrint = () => {
  const printQRCode = useCallback((qrData) => {
    // Create an iframe for printing
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Write the print template to the iframe
    iframe.contentDocument.write(generatePrintTemplate(qrData));
    iframe.contentDocument.close();

    // Wait for images to load before printing
    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      
      // Remove the iframe after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 100);
    };
  }, []);

  return { printQRCode };
};