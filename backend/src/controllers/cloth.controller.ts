import {getAllClothes} from '../models/cloth.model.js';
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

export default {
    listAllClothes
}