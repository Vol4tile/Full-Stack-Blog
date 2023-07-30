import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import postRouter from "./Routers/postRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
// import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import { dirname } from "path";
dotenv.config();

const app = express();
app.use(helmet());
app.use(helmet.xPoweredBy({ setTo: "HTML" }));

//app.use(helmet.hidePoweredBy({ setTo: 'HTML' }));
app.use(cookieParser());

/*const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

*/
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.static(dirname(fileURLToPath(import.meta.url)) + "/uploads"));
app.use(express.json({ limit: "50mb" }));

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(5000, () => {
  mongoose
    .connect(process.env.DB_COLLECTION_STRING)
    .then(() => console.log("db baglandi"))
    .catch((error) => console.log(error));
});
