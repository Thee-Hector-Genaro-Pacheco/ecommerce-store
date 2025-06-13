// Import Apollo Client core features
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// Import setContext to add authentication headers dynamically
import { setContext } from '@apollo/client/link/context';

// --- STEP 1: Create the base HTTP link to your GraphQL server ---
// This defines the base URI your frontend will use to send GraphQL requests
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Change this to your production URL later if needed
});

// --- STEP 2: Add a middleware to attach the Authorization header ---
// This function runs before every GraphQL request and adds the token from localStorage
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  console.log("🟡 Sending Token from Apollo Client:", token);

  return {
    headers: {
      ...headers,
      authorization: token
        ? token.startsWith('Bearer ') ? token : `Bearer ${token}`
        : '',
    },
  };
});

// --- STEP 3: Create the Apollo Client instance ---
// ApolloClient manages all GraphQL queries and caching across your app
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine the auth middleware with the HTTP link
  cache: new InMemoryCache(),      // Use Apollo’s built-in caching mechanism
});

// Export the configured Apollo Client so it can be used throughout the app
export default client;
