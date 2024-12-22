import { toast } from "@/hooks/use-toast";
import { getActionErrorMessage } from "@/utils";
import axios from "axios";

export const printQr = (tableId, setQrLoading) => async (dispatch) => {
    console.log("action-download-req:", tableId);
    try {
        setQrLoading(tableId);

        // Fetch the file as a Blob
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/qrs/${tableId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                responseType: "blob", // Important: This tells axios to return the response as a Blob
                withCredentials: true,
            }
        );

        // Create a blob URL for the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `table-${tableId}-qr.pdf`); // File name
        document.body.appendChild(link);
        link.click(); // Trigger the download
        link.remove(); // Clean up

        // Success toast
        toast({
            title: "Success",
            description: "QR downloaded successfully.",
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
