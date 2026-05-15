import mongoose, { Schema } from "mongoose";

export interface IDocument {
    borrowerId: mongoose.Types.ObjectId;
    fileName: string;
    originalName: string;
    fileUrl: string;
    publicId: string;
    mimeType: string;
    fileSize: number;
}

const documentSchema = new Schema<IDocument>({
    borrowerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    fileName: {
        type: String,
        required: true,
    },

    originalName: {
        type: String,
        required: true,
    },

    fileUrl: {
        type: String,
        required: true,
    },

    publicId:{
        type:String,
    },

    mimeType: {
        type: String,
        required: true,
    },

    fileSize: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

export const Document = mongoose.model<IDocument>("Document", documentSchema);