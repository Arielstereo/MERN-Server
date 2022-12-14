import "dotenv/config";
import DBConnection from "./config/database.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";

const PORT = process.env.PORT || 4000;
const app = express();

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
  })
);

//routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

async function main() {
  DBConnection(); // Llamado a la conexión con MongoDB
  await app.listen(`${PORT}`);
  console.log(`Server listening on http://localhost:${PORT}`);
}

main();
