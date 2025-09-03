import { pool } from "../db.js";

export async function getAllUsers() {
  const [rows] = await pool.query(
    "SELECT id, firstname, lastname, age FROM users"
  );
  return rows;
}

export async function getUserById(id) {
  const [rows] = await pool.query(
    "SELECT id, firstname, lastname, age FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
}

export async function createUser({ firstname, lastname, age }) {
  const [result] = await pool.execute(
    "INSERT INTO users (firstname, lastname, age) VALUES (?, ?, ?)",
    [firstname, lastname, age ?? null]
  );
  return result.insertId;
}

export async function updateUser(id, fields) {
  const sets = [];
  const values = [];

  if (fields.firstname !== undefined) {
    sets.push("firstname = ?");
    values.push(fields.firstname);
  }
  if (fields.lastname !== undefined) {
    sets.push("lastname = ?");
    values.push(fields.lastname);
  }
  if (fields.age !== undefined) {
    sets.push("age = ?");
    values.push(fields.age);
  }

  if (sets.length === 0) return null;

  values.push(id);

  const sql = `UPDATE users SET ${sets.join(", ")} WHERE id = ?`;
  const [result] = await pool.execute(sql, values);

  return result.affectedRows > 0;
}

export async function deleteUser(id) {
  const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
