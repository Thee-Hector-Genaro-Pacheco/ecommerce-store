// client/src/graphql/mutations/createUser.ts
import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      email
      isAdmin
      profilePicture
    }
  }
`;
