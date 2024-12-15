import path from 'path'
import fs from 'fs'
import uploadToCloudinary from './uploadToCloudinaryService.js';
const getFileExtension = (fileName)=>{
   return fileName.split(".").pop();
}

const uploadAndGetAvatarUrl = async (file, resource, resourceId) => {
    const avatarUrl = await uploadToCloudinary(path, `OMS/Profile/${resource}`,resourceId,2);
    return avatarUrl;
};


export default uploadAndGetAvatarUrl;