export interface UploadImageArgs {
    fileBuffer: string; // Base64 encoded sent from the frontend
    originalName: string; // Original filename with extension
    mimeType: string; // MIME type of the file (e.g., image/jpeg, image/png)
}
