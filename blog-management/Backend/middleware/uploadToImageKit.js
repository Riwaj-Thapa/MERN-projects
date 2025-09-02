import imagekit from "../config/imageKit.js";


export const uploadToImageKit = async (fileBuffer, fileName = `file_${Date.now()}`, folder = "/blogs") => {
  try {
    const result = await imagekit.upload({
      file: fileBuffer,   // Multer memory buffer
      fileName: fileName, // optional custom file name
      folder: folder,     // optional folder in ImageKit
    });
    return result.url;    // secure URL of the uploaded image
  } catch (error) {
    throw new Error("Image upload failed: " + error.message);
  }
};
