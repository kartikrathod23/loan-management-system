import cloudinary from "../../config/cloudinary";
import streamifier from "streamifier";

export const uploadToCloudinary=(fileBuffer: Buffer,folder = "lms")=>{
    return new Promise<any>((resolve,reject)=>{
        const stream =
          cloudinary.uploader.upload_stream(
            {
              folder,
            },

            (
              error,
              result
            ) => {
              if (result)
                resolve(
                  result
                );

              else
                reject(
                  error
                );
            }
          );

        streamifier
          .createReadStream(
            fileBuffer
          )
          .pipe(stream);
      }
    );
  };