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
      body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #fff;
        color: #333;
        line-height: 1.5;
      }
      .card {
        width: 100%;
        max-width: 600px;
        margin: 2rem auto;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: none;
      }
      .card-header {
        text-align: center;
        margin-bottom: 1rem;
      }
      .card-header h1 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: #2c3e50;
      }
      .card-header p {
        font-size: 0.9rem;
        color: #6c757d;
      }
      .card-content {
        margin-bottom: 1.5rem;
      }
      .card-content .info {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }
      .separator {
        height: 1px;
        background-color: #eaeaea;
        margin: 1rem 0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
      }
      table th, table td {
        padding: 0.5rem;
      }
    table td {
        text-align: left;
    }
      table th {
        text-align: left;
        background-color: #f9f9f9;
        font-weight: bold;
      }

        .table-total-row {
            text-align: right;
        }

      .total-section {
        margin-top: 1rem;
        font-size: 0.9rem;
      }
      .total-section .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }
      .total-section .row.bold {
        font-weight: bold;
      }
      .card-footer {
        text-align: center;
        font-size: 0.9rem;
        margin-top: 1rem;
      }
      .badge {
        display: inline-block;
        padding: 0.3rem 0.6rem;
        font-size: 0.8rem;
        border-radius: 4px;
        color: #fff;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
      }
      .badge.success {
        background-color: #28a745;
      }
      .badge.destructive {
        background-color: #dc3545;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="card-header">
        <h1>${billData.hotelId.name}</h1>
        <p>Order #${billData._id.slice(-6)}</p>
      </div>
      <div class="card-content">
        <div class="info">
          <span>Date: ${new Date(billData.createdAt).toLocaleString()}</span>
          <span>Table: ${billData.tableId.sequence}</span>
        </div>
        <div class="info">
          <span>Paid by: ${billData.customerName}</span>
        </div>
        <div class="separator"></div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th style="text-align:right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${billData.orderedItems.map((item) => `
              <tr>
                <td>${item.dishId.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.dishId.price.toFixed(2)}</td>
                <td style="text-align:right" >₹${(item.quantity * item.dishId.price).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="separator"></div>
        <div class="total-section">
          <div class="row">
            <span>Subtotal:</span>
            <span>₹${billData.totalAmount.toFixed(2)}</span>
          </div>
          <div class="row">
            <span>Discount:</span>
            <span>-₹${billData.totalDiscount.toFixed(2)}</span>
          </div>
          ${billData.customDiscount ? `
            <div class="row">
              <span>Custom Discount:</span>
              <span>-₹${billData.customDiscount.toFixed(2)}</span>
            </div>
          ` : ''}
          <div class="row bold">
            <span>Total:</span>
            <span>₹${billData.finalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="badge ${billData.status === 'paid' ? 'success' : 'destructive'}">
          ${billData.status.toUpperCase()}
        </div>
        <p>Thank you for dining with us!</p>
      </div>
    </div>
  </body>
</html>
`;

