import s3 from "./s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export async function uploadImage(fileBuffer: Buffer, originalName: string, mimeType: string): Promise<string> {
    // Get file  extension like .jpg, .png,
    const fileExtension = path.extname(originalName);
    // Generate a unique file name using uuid
    const fileName = `${uuidv4()}${fileExtension}`;

    // Build parameters for the S3 upload
    const params = {
        Bucket: process.env.S3_BUCKET_NAME as string,
        Key: fileName,
        Body: fileBuffer,
        ContentType: mimeType,
    }

    // Perorm the upload and wait for it to finish
    const uploadResult = await s3.upload(params).promise();
    // Return the URL of the uploaded image
    return uploadResult.Location;
}