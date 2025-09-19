import db from "../config/database.js";

export const getAllClothes = (): Promise<any[]> => {
  return db.any("SELECT * FROM cloth");
};

export const getAllTops = (userId:number) =>{
  return db.any("SELECT color,type,img_path FROM cloth WHERE user_id = ($1) AND category = 'top'",[userId]);
}


export const getAllBottoms = (userId:number) =>{
  return db.any("SELECT color,type,img_path FROM cloth WHERE user_id = ($1) AND category = 'bottom'",[userId]);
}

export const createClothes = (type:string,color:string,season:string,userId:number,imagePath:string,category:string):Promise<null> =>{
  return db.none(`INSERT INTO cloth (type,color,season,user_id,img_path,category) VALUES ($1,$2,$3,$4,$5,$6)`,[type,color,season,userId,imagePath,category] );
};