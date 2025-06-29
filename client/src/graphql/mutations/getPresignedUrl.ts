import { gql } from '@apollo/client';

export const GET_PRESIGNED_URL = gql`
  mutation GetPresignedUrl($filename: String!, $folder: String!) {
    getPresignedUrl(filename: $filename, folder: $folder)
  }
`;
