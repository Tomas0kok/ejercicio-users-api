import express from "express";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
