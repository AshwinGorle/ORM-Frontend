// import { v2 as cloudinary } from "cloudinary";

// // Configure Cloudinary with your credentials
// cloudinary.config({
//   cloud_name: "dpgj9mrly",
//   api_key: "551968651855126",
//   api_secret: "BAE53B15sBunaCEbmg1gNQM5VV8",
// });

// const uploadToCloudinary = async (filePath, folderName, fileName, retries = 2) => {
//   return new Promise((resolve, reject) => {
//     const uploadFunction = (retryCount) => {
//       cloudinary.uploader.upload(
//         filePath,
//         {
//           resource_type: 'raw', // Specify that you are uploading a raw file
//           public_id: `${folderName}/${fileName}` // Set folder name and file name
//         },
//         function (error, result) {
//           if (error) {
//             console.error("Error uploading file to Cloudinary:", error);
//             if (retryCount > 0) {
//               console.log(`Retrying upload. ${retryCount} retries left...`);
//               uploadFunction(retryCount - 1); // Retry the upload
//             } else {
//               console.error("Retry limit reached. Upload failed.");
//               reject(error);
//             }
//           } else {
//             console.log("File uploaded to Cloudinary successfully");
//             resolve(result?.secure_url); // Return the secure URL of the uploaded file
//           }
//         }
//       );
//     };

//     uploadFunction(retries);
//   });
// };

// export default uploadToCloudinary;


import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dpgj9mrly",
  api_key: "551968651855126",
  api_secret: "BAE53B15sBunaCEbmg1gNQM5VV8",
});

export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_upload_preset");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dpgj9mrly/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload to Cloudinary");
    }

    const result = await response.json();
    return result.secure_url;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
