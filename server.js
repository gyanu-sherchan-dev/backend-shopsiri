import app from "./app.js";
import process from "process";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import dotenv from "dotenv";
import { mongoConnect } from "./db/Database.js";
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

//for all the traffic
app.use("*", (req, res, next) => {
  const error = {
    status: error,
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
  console.log(`Server is running on http://localhost:${PORT}`);
});

//unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
