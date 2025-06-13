// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component
import App from './App.tsx';

// Import the ApolloProvider to connect React with Apollo Client
import { ApolloProvider } from '@apollo/client';

// Import the custom Apollo Client instance
import client from './graphql/client';

// Import global CSS styles
import './index.css';

// Render the React app and wrap it with ApolloProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ApolloProvider gives your entire app access to the GraphQL client */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
