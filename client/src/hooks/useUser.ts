// client/src/hooks/useUser.ts
import { useEffect, useState } from 'react';
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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

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

  // 👇 ADD THIS to log the actual error
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
