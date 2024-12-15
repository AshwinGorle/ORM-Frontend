import { uploadActions } from "@/redux/slices/uploadSlice.js";
import axios from "axios";
export const createUpload = (uploadData) => async (dispatch) => {
    console.log("action-create-upload-req:", uploadData);
    const formData = new FormData();
    Object.keys(uploadData).forEach((key)=>{
        if(key == 'file' && uploadData[key]){
            formData.append('logo', uploadData[key]);
        }else{
            formData.append(key, uploadData[key]);
        }
    })
    try {
        dispatch(uploadActions.createUploadRequest());
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-create-upload-res:", data);
        if (status === "success") {
            dispatch(uploadActions.createUploadSuccess(data));
        } else {
            dispatch(uploadActions.createUploadFailure(message));
        }
    } catch (error) {
        console.log("action-create-upload-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(uploadActions.createUploadFailure(errorMessage));
    }
};