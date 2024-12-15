import { createSlice } from "@reduxjs/toolkit";

const initialUpload = {
    createUpload: {
        status: null,
        error: null,
        data: null,
    },

    getAllUploads: {
        status: null,
        error: null,
        data: null,
    },

    updateUpload: {
        status: null,
        error: null,
        data: null,
    },

    deleteUpload: {
        status: null,
        error: null,
        data: null,
    },
};

const uploadSlice = createSlice({
    name: "upload",
    initialState: initialUpload,
    reducers: {
        // createUpload
        createUploadRequest: (state) => {
            state.createUpload.status = "pending";
        },
        createUploadSuccess: (state, action) => {
            state.createUpload.status = "success";
            state.createUpload.data = action.payload;
            // state.getAllUploads.data.uploads =  state.getAllUploads.data.uploads.map((upload)=>{
            //     if(upload._id == action.payload.upload._id) return action.payload.upload
            //     else return upload
            // })
            // state.getAllUploads.data.uploads.push(action.payload.upload);

        },
        createUploadFailure: (state, action) => {
            state.createUpload.status = "failed";
            state.createUpload.error = action.payload;
        },

        // getAllUploads
        getAllUploadsRequest: (state) => {
            state.getAllUploads.status = "pending";
        },
        getAllUploadsSuccess: (state, action) => {
            state.getAllUploads.status = "success";
            state.getAllUploads.data = action.payload;
        },
        getAllUploadsFailure: (state, action) => {
            state.getAllUploads.status = "failed";
            state.getAllUploads.error = action.payload;
        },

        // updateUpload
        updateUploadRequest: (state) => {
            state.updateUpload.status = "pending";
        },
        updateUploadSuccess: (state, action) => {
            state.updateUpload.status = "success";
            state.updateUpload.data = action.payload;
            state.getAllUploads.data.uploads = state.getAllUploads.data.uploads.map((upload) => {
                if (upload._id === action.payload.upload._id) {
                    return action.payload.upload;
                } else {
                    return upload;
                }
            });
        },
        updateUploadFailure: (state, action) => {
            state.updateUpload.status = "failed";
            state.updateUpload.error = action.payload;
        },

        // deleteUpload
        deleteUploadRequest: (state) => {
            state.deleteUpload.status = "pending";
        },
        deleteUploadSuccess: (state, action) => {
            state.deleteUpload.status = "success";
            state.getAllUploads.data.uploads = state.getAllUploads.data.uploads.filter(
                (upload) => upload._id !== action.payload.upload
            );
        },
        deleteUploadFailure: (state, action) => {
            state.deleteUpload.status = "failed";
            state.deleteUpload.error = action.payload;
        },

        // Manual state cleaners
        clearGetAllUploadsStatus : (state)=>{
            state.getAllUploads.status = null;
        },
        clearGetAllUploadsError : (state)=>{
            state.getAllUploads.error = null;
        },

        clearCreateUploadStats: (state) => {
            state.createUpload.status = null;
            state.createUpload.error = null;
            state.createUpload.data = null;
        },


        clearUpdateUploadStats: (state) => {
            state.updateUpload.status = null;
            state.updateUpload.error = null;
            state.updateUpload.data = null;
        },

        clearDeleteUploadStats: (state) => {
            state.deleteUpload.status = null;
            state.deleteUpload.error = null;
            state.deleteUpload.data = null;
        },
    },
});

export const uploadActions = uploadSlice.actions;
export const uploadReducer = uploadSlice.reducer;
