import mongoose from "mongoose";

export const mongoConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    conn &&
      console.log(`mongodb connected ${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`${error.message} unable to connect mongodb`.bgRed.white);
  }
};
