import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "token"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("LowDev API funcionando 🚀");
});

app.use("/api", projectRoutes);

export default app;