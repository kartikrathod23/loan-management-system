import { Document } from "./document.model";
import { uploadToCloudinary } from "../../shared/utils/uploadToCloudinary";

export const saveDocument = async (userId: string, file: Express.Multer.File) => {
    const cloudinaryResponse = await uploadToCloudinary(file.buffer, "salary-slips");

    const document =
        await Document.create({
            borrowerId: userId,
            fileName: file.originalname,
            originalName: file.originalname,
            fileUrl: cloudinaryResponse.secure_url,
            publicId: cloudinaryResponse.public_id,
            mimeType: file.mimetype,
            fileSize: file.size,
        });

    return document;
};