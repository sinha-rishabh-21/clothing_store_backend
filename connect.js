import mongoose from "mongoose";

async function connectMongoDb(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDb Connected");
    })
    .catch((err) => {
      console.log("MongoDb Connection Error");
    });
}

export default connectMongoDb;
