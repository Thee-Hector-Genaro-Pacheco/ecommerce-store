import { useEffect} from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_ME = gql`
  query Me {
    me {
      id
      username
      email
      isAdmin
    }
  }
`;

export const useUser = () => {
  const token = localStorage.getItem('token'); // ⚠️ Fetch it directly

  const { data, loading, error } = useQuery(GET_ME, {
    skip: !token,
    context: token
      ? {
          headers: {
            Authorization: token.startsWith('Bearer ')
              ? token
              : `Bearer ${token}`,
          },
        }
      : undefined,
  });

  useEffect(() => {
    if (error) {
      console.error("❌ useUser GraphQL Error:", error.message);
      if (error.graphQLErrors.length > 0) {
        console.error("❌ GraphQL errors:", error.graphQLErrors);
      }
      if (error.networkError) {
        console.error("❌ Network error:", error.networkError);
      }
    }
  }, [error]);

  return {
    user: data?.me,
    loading,
    error,
  };
};