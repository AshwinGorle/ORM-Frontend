import { toast } from "@/hooks/use-toast";
import { getActionErrorMessage } from "@/utils";
import axios from "axios";
import { QrActions } from "@/redux/slices/qrSlice";

export const getQr = (tableId, setQrLoading) => async (dispatch) => {
    try {
        setQrLoading(tableId);
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/qrs/${tableId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        // Dispatch success action to update the store with the fetched data
        dispatch(QrActions.getQrSuccess(response.data));

        toast({
            title: "Success",
            description: "QR Code details fetched successfully",
            variant: "success",
        });

    } catch (error) {
        console.log("action-get-qr-error:", error);
        dispatch(QrActions.getQrFailure(getActionErrorMessage(error)));
        toast({
            title: "Failed",
            description: getActionErrorMessage(error),
            variant: "destructive",
        });
    } finally {
        setQrLoading(null);
    }
};


export const printQr = (tableId, setQrLoading) => async (dispatch) => {
    try {
        setQrLoading(tableId);
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/qrs/${tableId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { qrCodeImage, tableNumber, hotelName } = response.data;

        // Create a new window for printing
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(generateHtmlContent(qrCodeImage.imageUrl, tableId, tableNumber, hotelName));

        // Wait for the QR code image to load
        await new Promise((resolve, reject) => {
            const img = printWindow.document.querySelector('img');
            if (img.complete) {
                resolve();
            } else {
                img.onload = resolve;
                img.onerror = reject;
            }
        });

        // Add print-specific styles
        const style = printWindow.document.createElement('style');
        style.textContent = `
            @page {
                size: 148mm 210mm; /* A5 size */
                margin: 0;
            }
            @media print {
                html, body { 
                    width: 148mm;
                    height: 210mm;
                    margin: 0;
                    padding: 0;
                }
                body { 
                    background: linear-gradient(135deg, rgb(255, 204, 128), rgb(255, 87, 34), rgb(255, 138, 101)) !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
                .container { 
                    box-shadow: none !important;
                    width: 148mm !important;
                    max-width: none !important;
                    background-color: white !important;
                    margin: 0 auto !important;
                    padding: 10mm !important;
                }
                .button-container { display: none; }
            }
            @media screen {
                .button-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    display: flex;
                    gap: 10px;
                }
                .action-button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s;
                }
                .print-button {
                    background: #4CAF50;
                    color: white;
                }
                .print-button:hover { background: #45a049; }
                .download-button {
                    background: #2196F3;
                    color: white;
                }
                .download-button:hover { background: #1976D2; }
            }
        `;
        printWindow.document.head.appendChild(style);

        // Add button container
        const buttonContainer = printWindow.document.createElement('div');
        buttonContainer.className = 'button-container';

        // Print button
        const printButton = printWindow.document.createElement('button');
        printButton.className = 'action-button print-button';
        printButton.innerHTML = '🖨️ Print QR Code';
        printButton.onclick = () => {
            const style = printWindow.document.createElement('style');
            style.textContent = `
                @page {
                    size: A5 portrait;
                    margin: 0;
                }
                @media print {
                    html, body {
                        width: 148mm;
                        height: 210mm;
                    }
                }
            `;
            printWindow.document.head.appendChild(style);
            printWindow.print();
            printWindow.document.head.removeChild(style);
        };

        // Download button
        const downloadButton = printWindow.document.createElement('button');
        downloadButton.className = 'action-button download-button';
        downloadButton.innerHTML = '⬇️ Download PDF';
        downloadButton.onclick = async () => {
            const html2pdf = (await import('html2pdf.js')).default;
            
            // Hide buttons before capture
            buttonContainer.style.display = 'none';
            
            // Force background and styles to be visible
            const element = printWindow.document.querySelector('.container');
            const parentBody = element.parentElement;
            
            // Save original styles
            const originalBodyStyle = parentBody.style.cssText;
            
            // Force styles for capture
            parentBody.style.cssText = `
                background: linear-gradient(135deg, rgb(255, 204, 128), rgb(255, 87, 34), rgb(255, 138, 101));
                min-height: 210mm;
                width: 148mm;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            element.style.cssText = `
                width: 128mm;
                background-color: white;
                border-radius: 15px;
                padding: 10mm;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                text-align: center;
                margin: 0 auto;
            `;

            // Force QR code size
            const qrImage = element.querySelector('img');
            qrImage.style.width = '80mm';
            qrImage.style.height = '80mm';
            qrImage.style.objectFit = 'contain';

            const opt = {
                margin: 0,
                filename: `table-${tableNumber}-qr.pdf`,
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { 
                    scale: 4, // Increased for better quality
                    useCORS: true,
                    backgroundColor: null,
                    logging: true,
                    width: 148 * 2.83465, // Convert mm to pixels
                    height: 210 * 2.83465
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a5', 
                    orientation: 'portrait',
                    compress: true,
                    hotfixes: ["px_scaling"]
                }
            };
            
            try {
                await html2pdf().from(parentBody).set(opt).save();
            } finally {
                // Restore original styles
                parentBody.style.cssText = originalBodyStyle;
                qrImage.style.cssText = '';
                buttonContainer.style.display = 'flex';
            }
        };

        buttonContainer.appendChild(printButton);
        buttonContainer.appendChild(downloadButton);
        printWindow.document.body.appendChild(buttonContainer);

        printWindow.document.close();
        printWindow.focus();

        toast({
            title: "Success",
            description: "QR Code ready for printing or download",
            variant: "success",
        });

        setQrLoading(null);
    } catch (error) {
        console.log("action-download-error:", error);
        setQrLoading(null);
        let errorMessage = getActionErrorMessage(error);
        toast({
            title: "Failed",
            description: `${errorMessage}`,
            variant: "destructive",
        });
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
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, rgb(255, 204, 128), rgb(255, 87, 34), rgb(255, 138, 101));
                    background-attachment: fixed;
                    background-size: cover;
                    color: #333;
                }

                .container {
                    width: 80%; 
                    max-width: 550px;
                    background-color: #fff;
                    border-radius: 15px;
                    padding: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    text-align: center;
                }

                .header {
                    font-size: 24px;
                    font-weight: bold;
                    color: #2c3e50;
                    margin-bottom: 10px;
                }

                .hotel-name {
                    font-size: 20px;
                    font-weight: bold;
                    color: rgb(255, 87, 34);
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .qr-container {
                    margin: 20px 0;
                }

                .qr-container img {
                    width: 300px;
                    height: auto;
                    margin-bottom: 10px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
                }

                .table-info {
                    font-size: 18px;
                    color: #555;
                    margin-top: 10px;
                    font-weight: bold;
                }

                .footer {
                    font-size: 12px;
                    margin-top: 20px;
                    color: #7f8c8d;
                    font-style: italic;
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
