import db from "../config/database.js";

export const getAllClothes = (): Promise<any[]> => {
  return db.any("SELECT * FROM cloth");
};


export const createClothes = (type:string,color:string,season:string,userId:number):Promise<null> =>{
  return db.none(`INSERT INTO cloth (type,color,season,user_id) VALUES ($1,$2,$3,$4)`,[type,color,season,userId] );
};