const mongoose = require("mongoose");
const { databaseURL } = require("../config/index");

const mongooseOptions = {
  useNewUrlParser: true,
};
connectingDatabase = () => {
  mongoose
    .connect(databaseURL, mongooseOptions)
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
