// client/src/graphql/mutations/uploadImage.ts
import { gql } from '@apollo/client';

export const UPLOAD_IMAGE = gql`
  mutation UploadImage(
    $fileBuffer: String!
    $originalName: String!
    $mimeType: String!
    $folder: String
  ) {
    uploadImage(
      fileBuffer: $fileBuffer
      originalName: $originalName
      mimeType: $mimeType
      folder: $folder
    ) {
      url
    }
  }
`;
