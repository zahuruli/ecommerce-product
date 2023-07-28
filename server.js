import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import Authrouter from "./routes/authRoute.js";
import cors from "cors";
import CategoryRouter from "./routes/categoryRoute.js";
import ProductRouter from "./routes/productRoute.js";
//configuration:
dotenv.config();

//database connect:
connectDB();

//rest object
const app = express();

//api config:
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes:
app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/product", ProductRouter);
//rest Api:
app.use("/", (req, res) => {
  res.send({
    message: "Welcome to  our server",
    Writer: " Zahurul islam",
  });
});

//Port:

const PORT = process.env.PORT || 8000;
const HostName = "127.0.0.1";

//server listening:

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} at http://${HostName}:${PORT}`
      .bgCyan.red
  );
});
