import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { mongo } from "./models";
import entityRouter from "./rest/entityRoutes";

const CORS_ALLOW_LIST = ["http://localhost:3000"];

const CORS_OPTIONS: cors.CorsOptions = {
  origin: CORS_ALLOW_LIST,
  credentials: true,
};

const app = express();
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded());

app.use("/entities", entityRouter);

mongo.connect();

app.listen({ port: 5000 }, () => {
  /* eslint-disable-next-line no-console */
  console.info("Server is listening on port 5000!");
});
