import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import router from "../router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

/* These lines of code are setting up middleware functions for the Express application. */
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () =>
  console.log("Server is running on htttp://localhost:8080/")
);

console.log("mongodb", process.env.MONGO_URL);

/* This code is setting up a connection to a MongoDB database using the Mongoose library. */
mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected to MongoDB..."));
//   .catch((err) => console.log("Cannot connect to MongoDB", err));

mongoose.connection.on("error", (error: Error) => console.log(error));

// set up router
app.use("/", router());
