import express from "express";
import cors from "cors";

import cvRoutes from "./routes/cvRoutes.js";

const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.use("/cv", cvRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
