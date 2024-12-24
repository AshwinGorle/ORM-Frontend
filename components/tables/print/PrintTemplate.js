"use client";

export const generatePrintTemplate = (qrData) => `
<!DOCTYPE html>
<html>
  <head>
    <title>QR Code - Table ${qrData.tableNumber}</title>
    <style>
      @page {
        size: A4;
        margin: 15mm;
      }
      
      :root {
        --primary-color: #0f172a;
        --secondary-color: #64748b;
        --border-color: #e2e8f0;
        --background-color: #ffffff;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        padding: 40px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: var(--background-color);
        color: var(--primary-color);
      }
      
      .container {
        max-width: 500px;
        margin: 0 auto;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        overflow: hidden;
      }
      
      .header {
        background: var(--primary-color);
        color: white;
        padding: 24px;
        text-align: center;
        position: relative;
      }
      
      .header h1 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      
      .header p {
        font-size: 14px;
        opacity: 0.9;
      }
      
      .content {
        padding: 32px;
      }
      
      .qr-section {
        display: flex;
        justify-content: center;
        padding: 24px;
        background: #f8fafc;
        border-radius: 8px;
        margin-bottom: 24px;
      }
      
      .qr-code {
        width: 240px;
        height: 240px;
        padding: 16px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      }
      
      .details {
        background: white;
        border-radius: 8px;
        border: 1px solid var(--border-color);
      }
      
      .detail-row {
        display: flex;
        padding: 16px;
        border-bottom: 1px solid var(--border-color);
      }
      
      .detail-row:last-child {
        border-bottom: none;
      }
      
      .label {
        flex: 1;
        color: var(--secondary-color);
        font-size: 14px;
      }
      
      .value {
        flex: 2;
        font-weight: 500;
        font-size: 14px;
      }
      
      .footer {
        margin-top: 24px;
        text-align: center;
        font-size: 12px;
        color: var(--secondary-color);
      }
      
      @media print {
        body {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
          background: none;
          padding: 0;
        }
        
        .container {
          box-shadow: none;
        }
        
        .qr-section {
          break-inside: avoid;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${qrData.hotelName}</h1>
        <p>Table QR Code</p>
      </div>
      
      <div class="content">
        <div class="qr-section">
          <img 
            src="${qrData.qrCodeImage.imageUrl}" 
            alt="Table QR Code" 
            class="qr-code"
          />
        </div>
        
        <div class="details">
          <div class="detail-row">
            <div class="label">Table Number</div>
            <div class="value">${qrData.tableNumber}</div>
          </div>
          <div class="detail-row">
            <div class="label">Table ID</div>
            <div class="value">${qrData.tableId}</div>
          </div>
          <div class="detail-row">
            <div class="label">Hotel ID</div>
            <div class="value">${qrData.hotelId}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>Scan this QR code to access the table's menu and services</p>
        </div>
      </div>
    </div>
  </body>
</html>
`;