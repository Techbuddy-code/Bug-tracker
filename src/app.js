import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bugRoutes from "./routes/bugRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("🚀 Bug Tracker API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);

export default app;