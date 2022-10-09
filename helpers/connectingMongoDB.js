require("dotenv").config();
const mongoose = require("mongoose");

const database = process.env.MONGO_URI;
const mongooseOptions = {
  useNewUrlParser: true,
};
connectingDatabase = () => {
  mongoose
    .connect(database, mongooseOptions)
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log(err.message));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

module.exports = connectingDatabase;
