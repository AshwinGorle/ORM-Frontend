import puppeteer from "puppeteer";
// import chromium from "@sparticuz/chromium";

export const generatePdfService = async (qrCode, tableId, tableNumber, hotelName) => {
    try {
        let browser;
        // const isProduction = process.env.NODE_ENV === 'production';
        
        // Local development environment
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox']
        });

        const page = await browser.newPage();
        const htmlContent = generateHtmlContent(qrCode, tableId, tableNumber, hotelName);
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A5",
            printBackground: true,
        });

        await browser.close();
        return pdfBuffer;
    } catch (error) {
        console.error('Failed to generate PDF:', error);
        throw error;
    }
};

const generateHtmlContent = (qrCode, tableId, tableNumber, hotelName) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Global styles */
                body {
                    font-family: 'Roboto', sans-serif;
                    margin: 0;
                    padding: 0;
                    min-height: 210mm;
                    width: 148mm;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, rgb(255, 204, 128), rgb(255, 87, 34), rgb(255, 138, 101));
                    background-attachment: fixed;
                    background-size: cover;
                    color: #333;
                }

                .container {
                    width: 128mm; /* 148mm - 20mm padding */
                    background-color: #fff;
                    border-radius: 15px;
                    padding: 10mm;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    margin: 10mm auto;
                }

                .header {
                    font-size: 24px;
                    font-weight: bold;
                    color: #2c3e50;
                    margin-bottom: 5mm;
                }

                .hotel-name {
                    font-size: 20px;
                    font-weight: bold;
                    color: rgb(255, 87, 34);
                    margin-bottom: 10mm;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .qr-container {
                    margin: 10mm 0;
                }

                .qr-container img {
                    width: 80mm;
                    height: auto;
                    margin-bottom: 5mm;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
                }

                .table-info {
                    font-size: 18px;
                    color: #555;
                    margin-top: 5mm;
                    font-weight: bold;
                }

                .footer {
                    font-size: 12px;
                    margin-top: 10mm;
                    color: #7f8c8d;
                    font-style: italic;
                }

                /* Remove animations for print */
                @media print {
                    * {
                        animation: none !important;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Experience Fine Dining</div>
                <div class="hotel-name">${hotelName}</div>
                <div class="qr-container">
                    <img src="${qrCode}" alt="QR Code">
                    <p class="table-info">Table No.: ${tableNumber}</p>
                    <p>Scan the QR code to view your table details and place your order!</p>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} ${hotelName}. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `;
};




