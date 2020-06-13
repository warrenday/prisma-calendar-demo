require('dotenv').config();

const config = {
  database: {
    uri: process.env.DATABASE_URL,
  },
};

export default config;
