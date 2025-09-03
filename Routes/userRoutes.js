import { Router } from "express";
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../Controllers/userController.js";

const router = Router();

router.get("/usuarios", getUsuarios);
router.get("/usuarios/:id", getUsuarioById);
router.post("/usuarios", createUsuario);
router.patch("/usuarios/:id", updateUsuario);
router.delete("/usuarios/eliminar/:id", deleteUsuario);

export default router;
