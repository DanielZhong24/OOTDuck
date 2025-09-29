import db from "../config/database.js";


export const getAllUsers = (): Promise<any[]> => {
  return db.any("SELECT * FROM users");
};

// Get a single user by ID
export const getUserById = (id: string): Promise<any> => {
  return db.one("SELECT * FROM users WHERE id = $1", [id]);
};
