import multer from "multer";
import { AppError } from "../shared/errors/AppError";

const allowedMimeTypes=[
  "application/pdf",
  "image/png",
  "image/jpeg",
];

export const upload =
  multer({
    storage:multer.memoryStorage(),
    limits:{
      fileSize:5*1024*1024,
    },

    fileFilter:(_req,file, cb)=>{
      if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(new AppError("Only PDF, PNG, JPG files are allowed",400));
      }
      cb(null, true);
    },
  });