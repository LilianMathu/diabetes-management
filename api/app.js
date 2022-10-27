import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import config from "../config";
import userRoute from "../api/routes/userRoute";
import smsRoute from "../api/routes/smsRoute";

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// db connection
const db = config.mongo_uri;

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Failed to connect to MongoDB!", error);
  }
};

connectDb();

// Install routes
app.use(userRoute);
app.use(smsRoute);

export default app;
