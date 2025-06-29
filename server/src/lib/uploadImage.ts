import s3 from "./s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";

/**
 * Uploads an image to a specified S3 folder.
 * @param fileBuffer Buffer of the image file.
 * @param originalName Original name with file extension.
 * @param mimeType MIME type (e.g. image/jpeg).
 * @param folder S3 folder path (e.g. 'profileImages', 'productImages').
 */
export async function uploadImage(
  fileBuffer: Buffer,
  originalName: string,
  mimeType: string,
  folder: string = "misc"
): Promise<string> {
  const fileExtension = path.extname(originalName);
  const fileName = `${folder}/${uuidv4()}${fileExtension}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,

    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location;
}