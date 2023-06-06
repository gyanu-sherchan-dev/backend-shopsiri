import app from "./app.js";
import process from "process";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import colors from "colors";
import authRoutes from "./routes/authRoute.js";

import dotenv from "dotenv";
import { mongoConnect } from "./config/Database.js";
dotenv.config();

//handalling uncaught request (exception)

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server for handling uncaught exceptions");
});

//config
const PORT =
  (process.env.NODE_ENV !== "PRODUCTION" && process.env.dbPORT) || 8000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//db config
mongoConnect();

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "welcome to ecommerce app",
  });
});

//for all the traffic
app.use("*", (req, res, next) => {
  const error = {
    status: "error",
    message: "404 page not found",
  };
  next(error);
});

//global error handler
app.use((error, req, res, next) => {
  try {
    console.log(error.message);
    const code = error.code || 500;
    res.status(code).json({
      status: error,
      message: error.message,
    });
  } catch (error) {
    res.json({
      status: error,
      message: error.message,
    });
  }
});

//create server
const server = app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} http://localhost:${PORT}`
      .bgBlue.white
  );
});

//unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
