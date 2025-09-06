import {getAllClothes,createClothes} from '../models/cloth.model.js';
import type {Request,Response} from "express";
const listAllClothes = async (req:Request,res:Response):Promise<void>=>{
    try{
        const clothes = await getAllClothes();
        res.status(200).json(clothes);
    }catch(error){
        console.log("Error fetching clothes:",error);
        res.status(500).json({error:"Failed to fetch data"});

    }
};
export const addClothes = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No image uploaded" });
      return;
    }

    const { type, color, season, userId } = req.body;
    if (!type || !color || !season || !userId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const userIdNum: number = Number(userId);

    const imagePath = req.file.path; 
    const originalName = req.file.originalname;

    console.log("Uploaded file:", req.file);

    const clothes = await createClothes(type, color, season, userIdNum, imagePath);

    res.status(201).json({
      message: "Successfully added new cloth!",
      clothes,
      file: {
        originalName,
        savedAs: req.file.filename,
        path: imagePath,
      },
    });
  } catch (error) {
    console.error("Error adding clothes:", error);
    res.status(500).json({ error: "Failed to add clothes" });
  }
};

const listClothesByUser = async(req:Request,res:Response):Promise<void>=>{
    try{
        const clothes = await getAllClothes();
        let userClothes = clothes.filter(x => x["user_id"] == req.params.id);
        res.status(200).json(userClothes);
    }catch(error){
        console.log("Error fetching clothes:",error);
        res.status(500).json({error:"Failed to fetch data"});

    }
}
export default {
    listAllClothes,
    addClothes,
    listClothesByUser
}