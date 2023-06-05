import mongoose from "mongoose";

export const mongoConnect = () => {
  try {
    const conn = mongoose.connect(process.env.DB_URL);
    conn && console.log("mongodb connected");
  } catch (error) {
    console.log(error.message + "unable to connect mongodb");
  }
};
