import {
  getAllClothes,
  createClothes,
  getAllTops,
  getAllBottoms,
  deleteClothes,
  getClothesById,
  updateClothes,
} from '../models/clothes.model.js';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
const listAllClothes = async (req: Request, res: Response): Promise<void> => {
  try {
    const clothes = await getAllClothes();
    res.status(200).json(clothes);
  } catch (error) {
    console.log('Error fetching clothes:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export const addClothes = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'Missing user id' });
    }

    const userIdNum = Number(userId);

    // --- Call AI server ---
    const formData = new FormData();
    formData.append('file', req.file.buffer, 'input.png');

    const aiResponse = await axios.post('http://localhost:8000/predict', formData, {
      responseType: 'arraybuffer',
      headers: formData.getHeaders ? formData.getHeaders() : {},
    });
  

    const processedBuffer = Buffer.from(aiResponse.data);
    const headers = aiResponse.headers;
    // --- Prepare file info but do NOT save yet ---
    const filename = `DA${Date.now()}-${Math.round(Math.random() * 10000)}.png`;
    const savePath = path.join(process.cwd(), 'src', 'img', filename);
    const relPath = path.posix.join('img', filename);
    const color = headers["clothing-color"];
    const type = headers["clothing-type"];
    const season = headers["clothing-season"];
    const category = headers["clothing-category"];
    // --- Save record in DB first ---
    const clothes = await createClothes(
      type,
      color,
      season,
      userIdNum,
      relPath,
      category,
      `${color} ${type}`
    );

    // --- Only save image if DB insert succeeded ---
    fs.writeFileSync(savePath, processedBuffer);

    res.status(201).json({
      message: 'Successfully added new cloth!',
      clothes: clothes,
      file: {
        savedAs: filename,
        path: relPath,
      },
    });
  } catch (error) {
   if(axios.isAxiosError(error)){
    if(error.response){
      return res.status(error.response.status).json({error: error.response.data?.error || "AI counldn't recongize clothing"});
    }
   }
   return res.status(500).json({error:"Failed to add new clothes"});
  }
};
const listClothesByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clothes = await getAllClothes();
    let userClothes = clothes.filter((x) => x['user_id'] == req.params.id);
    res.status(200).json(userClothes);
  } catch (error) {
    console.log('Error fetching clothes:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

const getRandomAssOutfit = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return { error: 'id is not valid' };
    }
    const id = parseInt(req.params.id);
    const tops = await getAllTops(id);
    const bottoms = await getAllBottoms(id);

    let randomTop = tops[Math.floor(Math.random() * tops.length)];
    let randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];

    res.status(200).json({randomTop,randomBottom});
  }catch(error){
    return res.status(500).json({error:"Fail to add to clothes"});
  }
};

const updateClothesById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id || isNaN(+req.params.id)) {
      return res.status(400).json({ error: 'Id not valid' });
    }

    const id = Number(req.params.id);
    const newName = req.body.name;

    if (!newName || typeof newName !== 'string') {
      return res.status(400).json({ error: 'Name not valid' });
    }

    await updateClothes(id, newName);
    return res.status(200).json({ message: 'Clothing renamed successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error });
  }
};

const removeClothesById = async(req:Request,res:Response)=>{
  try{
    if(!req.params.id || isNaN(+req.params.id)){
      return{"error":"Id not valid"};
    }

    const id = Number(req.params.id);
    const fetchData = await getClothesById(id);
    const relpath = fetchData['img_path'];
    const response = await deleteClothes(id);
    const deletePath = path.join(process.cwd(), 'src', relpath);
    fs.unlinkSync(deletePath);

    res.status(204).json({ message: '204 No Content success deletion' });
  } catch (error) {
    console.log('Error deleting clohes:', error);
    res.status(500).json({ error: 'Failed to delete data' });
  }
};
export default {
  listAllClothes,
  addClothes,
  listClothesByUser,
  getRandomAssOutfit,
  removeClothesById,
  updateClothesById,
};
