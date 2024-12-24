"use client";

export const generatePrintTemplate = (qrData) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Menu - ${qrData.hotelName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
      @page {
        size: A4;
        margin: 0;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Poppins', sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f0f0f0;
      }
      
      .page-container {
        width: 210mm;
        height: 297mm;
        position: relative;
        overflow: hidden;
        background-color: #ffffff;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
      }
      
      .content {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 2rem;
      }
      
      .header {
        text-align: center;
        margin-bottom: 2rem;
        position: relative;
      }
      
      .header::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 3px;
        background: linear-gradient(to right, #ff6b6b, #feca57);
      }
      
      .hotel-name {
        font-size: 4rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: #2c3e50;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
      }
      
      .subtitle {
        font-size: 1.8rem;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 3px;
        color: #34495e;
      }
      
      .main-content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
      }
      
      .qr-section {
        text-align: center;
        background: #ffffff;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
        max-width: 500px;
        width: 100%;
      }
      
      .qr-section::before {
        content: '';
        position: absolute;
        top: -50px;
        left: -50px;
        width: 100px;
        height: 100px;
        background: #feca57;
        border-radius: 50%;
      }
      
      .qr-section::after {
        content: '';
        position: absolute;
        bottom: -50px;
        right: -50px;
        width: 100px;
        height: 100px;
        background: #ff6b6b;
        border-radius: 50%;
      }
      
      .qr-code {
        width: 100%;
        max-width: 350px;
        height: auto;
        display: block;
        margin: 0 auto 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        position: relative;
        z-index: 1;
      }
      
      .table-info {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #2c3e50;
      }
      
      .scan-text {
        font-size: 1.5rem;
        font-weight: 400;
        color: #34495e;
      }
      
      .footer {
        margin-top: auto;
        text-align: center;
        font-size: 1.2rem;
        padding-top: 2rem;
        color: #34495e;
      }
      
      @media print {
        body {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
      }
    </style>
  </head>
  <body>
    <div class="page-container">
      <div class="content">
        <header class="header">
          <h1 class="hotel-name">${qrData.hotelName}</h1>
          <p class="subtitle">Digital Dining Experience</p>
        </header>
        
        <main class="main-content">
          <section class="qr-section">
            <img 
              src="${qrData.qrCodeImage.imageUrl}" 
              alt="Table QR Code" 
              class="qr-code"
            />
            <p class="table-info">Table ${qrData.tableNumber}</p>
            <p class="scan-text">Scan to Explore Our Menu &amp; Order</p>
          </section>
        </main>
        
        <footer class="footer">
          <p>Embark on a culinary journey through our digital menu.</p>
          <p>Scan the QR code to start your gastronomic adventure!</p>
        </footer>
      </div>
    </div>
  </body>
</html>
`;

