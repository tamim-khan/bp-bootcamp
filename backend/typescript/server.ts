import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { mongo } from "./models";
import productRouter from "./rest/productRoutes";
import saleRouter from "./rest/saleRoutes";

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

app.use("/products", productRouter);
app.use("/sales", saleRouter);

mongo.connect();

app.listen({ port: 5000 }, () => {
  /* eslint-disable-next-line no-console */
  console.info("Server is listening on port 5000!");
});
