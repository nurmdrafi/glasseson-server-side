require("dotenv").config();

const config = {
  port: process.env.PORT,
  databaseURL: process.env.MONGO_URI,
  secret: {
    accessToken: process.env.ACCESS_TOKEN_SECRET,
    refreshToken: process.env.REFRESH_TOKEN_SECRET,
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
};

module.exports = config;
