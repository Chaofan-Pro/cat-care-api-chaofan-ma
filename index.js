import express from "express";
import cors from "cors";
import "dotenv/config";
import catsRoute from "./routes/cats-routes.js";
const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.json());
app.use(cors());

app.use("/api/cats", catsRoute);

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
