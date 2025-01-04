"use client";

export const generatePrintTemplate = (billData) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bill - ${billData.hotelId.name}</title>
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
        padding: 2rem;
      }
      .header {
        text-align: center;
        margin-bottom: 2rem;
      }
      .hotel-name {
        font-size: 2.5rem;
        font-weight: 700;
        color: #2c3e50;
      }
      .bill-info {
        margin-bottom: 2rem;
      }
      .bill-info p {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 2rem;
      }
      .table th, .table td {
        border: 1px solid #ddd;
        padding: 0.8rem;
        text-align: left;
      }
      .table th {
        background-color: #f4f4f4;
        font-weight: 600;
      }
      .footer {
        margin-top: auto;
        text-align: center;
        font-size: 1rem;
        color: #34495e;
      }
    </style>
  </head>
  <body>
    <div class="page-container">
      <header class="header">
        <h1 class="hotel-name">${billData.hotelId.name}</h1>
        <p>Table ${billData.tableId.sequence}</p>
      </header>

      <section class="bill-info">
        <p><strong>Customer Name:</strong> ${billData.customerName}</p>
        <p><strong>Bill ID:</strong> ${billData._id}</p>
        <p><strong>Date:</strong> ${new Date(billData.createdAt).toLocaleDateString()}</p>
      </section>

      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${billData.orderedItems.map((item, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${item.dishId.name}</td>
              <td>${item.quantity}</td>
              <td>₹${item.dishId.price.toFixed(2)}</td>
              <td>₹${(item.quantity * item.dishId.price).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <section class="bill-summary">
        <p><strong>Total Amount:</strong> ₹${billData.totalAmount.toFixed(2)}</p>
        <p><strong>Discount:</strong> ₹${billData.totalDiscount.toFixed(2)}</p>
        <p><strong>Final Amount:</strong> ₹${billData.finalAmount.toFixed(2)}</p>
        <p><strong>Status:</strong> ${billData.status.charAt(0).toUpperCase() + billData.status.slice(1)}</p>
      </section>

      <footer class="footer">
        <p>Thank you for dining with us!</p>
      </footer>
    </div>
  </body>
</html>
`;
