import express from "express";

const app = express();

// //config - changed the path
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   dotenvConfig({
//     path: "backend-shopsiri/config/.env",
//   });
// }

// //config - .env file is handle on server.js
// const PORT =
//   (process.env.NODE_ENV !== "PRODUCTION" && process.env.dbPORT) || 8000;

export default app;
