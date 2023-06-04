import app from "./app.js";
import process from "process";

import dotenv from "dotenv";
dotenv.config();

//handalling uncaught request (exception)

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server for handling uncaught exceptions");
});

//config
const PORT =
  (process.env.NODE_ENV !== "PRODUCTION" && process.env.dbPORT) || 8000;

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
