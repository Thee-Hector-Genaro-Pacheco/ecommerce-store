import { gql } from '@apollo/client';

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($fileBuffer: String!, $originalName: String!, $mimeType: String!) {
    uploadImage(fileBuffer: $fileBuffer,
    originalName: $originalName, mimeType: $mimeType) {
        url
    }
  }
`;