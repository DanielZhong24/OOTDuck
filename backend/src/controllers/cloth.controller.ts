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
const addClothes = async (req:Request,res:Response):Promise<void>=>{
    try{
        const { type, color, season, userId } = req.body;
        if (!type || !color || !season || !userId) {
        res.status(400).json({ error: "Missing required fields" });
        return;
        }

        //need to check if userid exists first
        const userIdNum: number = Number(userId);        
        const clothes = await createClothes(type,color,season,userIdNum);
        res.status(201).json("Successfully added new cloth!");
    }catch(error){
        console.log("Error fetching clothes:",error);
        res.status(500).json({error:"Failed to fetch data"});

    }
};
export default {
    listAllClothes,
    addClothes
}