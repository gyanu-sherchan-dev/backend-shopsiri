import express from "express";
import { config as dotenvConfig } from "dotenv";

const app = express();

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenvConfig({
    path: "backend-shopsiri/config/.env",
  });
}

export default app;
