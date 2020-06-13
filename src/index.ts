import prisma from './prisma';
import createServer from './createServer';

const start = () => {
  const app = createServer();

  app.listen({ port: 4000 }, async () => {
    await prisma.connect();
    console.log('🚀 Server running at http://localhost:4000/graphql');
  });
};

start();
