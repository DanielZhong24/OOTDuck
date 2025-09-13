import { getAllClothes, createClothes } from '../models/clothes.model.js';
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

    const { type, color, season, userId } = req.body;
    if (!type || !color || !season || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
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

    // --- Prepare file info but do NOT save yet ---
    const filename = `DA${Date.now()}-${Math.round(Math.random() * 10000)}.png`;
    const savePath = path.join(process.cwd(), 'src', 'img', filename);
    const relPath = path.posix.join('img', filename);

    // --- Save record in DB first ---
    const clothes = await createClothes(type, color, season, userIdNum, relPath);

    // --- Only save image if DB insert succeeded ---
    fs.writeFileSync(savePath, processedBuffer);

    res.status(201).json({
      message: 'Successfully added new cloth!',
      clothes,
      file: {
        savedAs: filename,
        path: relPath,
      },
    });

  } catch (error) {
    console.error('Error adding clothes:', error);
    res.status(500).json({ error: 'Failed to add clothes' });
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
export default {
  listAllClothes,
  addClothes,
  listClothesByUser,
  // tempAddClothes,
};
