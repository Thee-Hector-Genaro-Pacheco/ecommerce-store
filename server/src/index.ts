import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { getUserFromToken } from './utils/auth';

dotenv.config();

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    bodyParser.json({ limit: '10mb' }),
    bodyParser.urlencoded({ extended: true, limit: '10mb' }),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || null;

        // ✅ Log the token for debugging
        console.log('🔐 Incoming Token:', token);

        const user = await getUserFromToken(token);

        // ✅ Optional: Log the decoded user
        console.log('👤 Authenticated User:', user);

        return { token, user };
      },
    })
  );

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.warn('⚠️ MongoDB connection failed:', err);
  }

  app.listen(4000, () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
}

startServer();