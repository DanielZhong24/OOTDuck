import db from "../config/database.js";

export const getAllClothes = (): Promise<any[]> => {
  return db.any("SELECT * FROM cloth");
};
