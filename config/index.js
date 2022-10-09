require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.MONGO_URI,
  secret: {
    accessToken: process.env.ACCESS_TOKEN_SECRET,
    refreshToken: process.env.REFRESH_TOKEN_SECRET,
  },
};
