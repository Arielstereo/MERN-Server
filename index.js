import "dotenv/config";
import DBConnection from "./config/database.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import fileUpload from "express-fileupload";

const PORT = process.env.PORT || 4000;
const app = express();

//middlewares
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
  })
);

import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";

//routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

async function main() {
  DBConnection(); // Llamado a la conexión con MongoDB
  await app.listen(`${PORT}`);
  console.log(`Server listening on http://localhost:${PORT}`);
}

main();
