import * as User from "../Models/userModel.js";

export async function getUsuarios(req, res) {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function getUsuarioById(req, res) {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    console.error("Error al obtener usuario por ID:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function createUsuario(req, res) {
  try {
    const { firstname, lastname, age } = req.body;
    if (!firstname || !lastname) {
      return res
        .status(400)
        .json({ error: "firstname y lastname son obligatorios" });
    }

    const id = await User.createUser({ firstname, lastname, age });
    const newUser = await User.getUserById(id);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function updateUsuario(req, res) {
  try {
    const updated = await User.updateUser(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const user = await User.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function deleteUsuario(req, res) {
  try {
    const deleted = await User.deleteUser(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.status(204).send();
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
