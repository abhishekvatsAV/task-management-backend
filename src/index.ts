import express, { RequestHandler } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";

import { checkAuth } from "./middlewares/auth.js";

const app = express();
app.use(express.json()); // this will parse any request and get any json inside any req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then((res) => {
    if (res) {
      app.listen(4000, () => {
        console.log("connected to db and listening to port : ", 4000);
      });
    }
  })
  .catch((err) => {
    console.log("🛑 error in connecting with db : ", err);
  });

// app.get("/", (req, res, next): RequestHandler => {
//   res.status(200).json({ message: "how u doin?" });
//   return;
// });

app.use("/user", userRoutes);
app.use(checkAuth);

app.use("/task", taskRoutes);
