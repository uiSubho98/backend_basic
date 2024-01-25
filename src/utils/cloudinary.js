import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload fileon cloud
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return response;
    console.log("FILE UPLOADED ON CLOUD", response.url);
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally save temporary file as the upload operation got failed
  }
};

export { uploadOnCloudinary };
