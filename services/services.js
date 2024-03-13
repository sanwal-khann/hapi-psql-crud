const client = require("../src/db");
const createUser = async (name, email, age) => {
  const result = await client.query(
    "INSERT INTO contacts(name, email, age) VALUES($1, $2, $3) RETURNING *",
    [name, email, age]
  );
  return result.rows[0];
};
const getUsers = async () => {
  const result = await client.query("SELECT * FROM contacts");
  return result.rows;
};
const getUserById = async (id) => {
  const result = await client.query("SELECT * FROM contacts WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};
const updateUser = async (id, name, email, age) => {
  const result = await client.query(
    "UPDATE contacts SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
    [name, email, age, id]
  );
  return result.rows[0];
};
const deleteUser = async (id) => {
  const result = await client.query(
    "DELETE FROM contacts WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
