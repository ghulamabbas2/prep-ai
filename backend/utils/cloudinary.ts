import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload_file = (
  file: string,
  folder: string
): Promise<{ id: string; url: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Upload failed"));
        }

        resolve({
          id: result.public_id,
          url: result.secure_url,
        });
      }
    );
  });
};

const delete_file = async (publicId: string): Promise<boolean> => {
  const res = await cloudinary.v2.uploader.destroy(publicId);

  if (res?.result === "ok") return true;
  return false;
};

export { upload_file, delete_file };
