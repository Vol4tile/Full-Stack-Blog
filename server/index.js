import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import postRouter from "./Routers/postRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { fileURLToPath } from "url";
import { dirname } from "path";
import config from "./config.js";

const app = express();
app.use(helmet());
app.use(helmet.xPoweredBy({ setTo: "HTML" }));
app.use(cookieParser());

mongoose
  .connect(config.DB_COLLECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Veritabanına bağlandı"))
  .catch((error) => {
    console.error("Veritabanı bağlantı hatası:", error);
    process.exit(1); // Uygulamayı veritabanı bağlantı hatasında sonlandır
  });

const corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.static(dirname(fileURLToPath(import.meta.url)) + "/uploads"));
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "HTML");
  next();
});
app.use("/user", userRouter);
app.use("/post", postRouter);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} numaralı portta çalışıyor`);
});
