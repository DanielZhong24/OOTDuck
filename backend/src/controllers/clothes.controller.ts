import {
  getAllClothes,
  createClothes,
  getAllTops,
  getAllBottoms,
  deleteClothes,
  getClothesById,
  updateClothes,
  getAllOnepieces,
  filterClothes,
  getMatchingColourOutfit,
  getNeutralOutfit,
  colourAndSeasonOutfit,
  getComplementaryOutfit,
  getNumberOfClothes
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


    const numberOfClothes = await getNumberOfClothes(userId);
    console.log(numberOfClothes);
    if(numberOfClothes.count > 30){
      return res.status(403).json({error:"User forbidden to perform this action: Exceed closet limit"});
    }



    // --- Call AI server ---
    const formData = new FormData();
    formData.append('file', req.file.buffer, 'input.png');

    const aiResponse = await axios.post(
      'http://localhost:8000/predict',
      formData,
      {
        responseType: 'arraybuffer',
        headers: formData.getHeaders ? formData.getHeaders() : {},
      }
    );

    const processedBuffer = Buffer.from(aiResponse.data);
    const headers = aiResponse.headers;
    // --- Prepare file info but do NOT save yet ---
    const filename = `DA${Date.now()}-${Math.round(Math.random() * 10000)}.png`;
    const savePath = path.join(process.cwd(), 'src', 'img', filename);
    const relPath = path.posix.join('img', filename);
    const color = headers['clothing-color'];
    const type = headers['clothing-type'];
    const season = headers['clothing-season'];
    const category = headers['clothing-category'];
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
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return res.status(error.response.status).json({
          error:
            error.response.data?.error || "AI counldn't recongize clothing",
        });
      }
    }
    return res.status(500).json({ error: 'Failed to add new clothes' });
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

const randomizeMatchingColour = async (id: number) => {
  const randomOutfit: { randomTop: any[]; randomBottom: any[] } =
    await getMatchingColourOutfit(id);
  if (!randomOutfit.randomTop || !randomOutfit.randomBottom) {
    return null;
  }
  return randomOutfit;
};

export const getRandomSlotOutfit = async (req: Request, res: Response) => {
  try {
    const userIdParam = req.params.id;
    const userId = userIdParam ? parseInt(userIdParam, 10) : NaN;
    if (isNaN(userId))
      return res.status(400).json({ error: 'Invalid user ID' });

    const tops = await getAllTops(userId);
    const bottoms = await getAllBottoms(userId);

    let randomTop: any;
    let randomBottom: any;

    if (req.query.colorHarmony) {
      let colorHarmony = req.query.colorHarmony;

      switch (colorHarmony) {
        case 'matching':
          const outfit = await randomizeMatchingColour(userId);
          if (!outfit) {
            return res
              .status(400)
              .json({ error: 'User does not have enough pieces' });
          }
          randomTop = outfit.randomTop[0];
          randomBottom = outfit.randomBottom[0];
          break;
        case 'complementary':
          console.log('complementary');
          const complementaryOutfit = await getComplementaryOutfit(userId);
          if (!complementaryOutfit) {
            return res
              .status(400)
              .json({ error: 'User does not have enough pieces' });
          }
          randomTop = complementaryOutfit.randomTop[0];
          randomBottom = complementaryOutfit.randomBottom[0];
          break;
        case 'neutral':
          const neutralOutfit = await getNeutralOutfit(userId);
          if (!neutralOutfit) {
            return res
              .status(400)
              .json({ error: 'User does not have enough neutral pieces' });
          }

          randomTop = neutralOutfit.randomTop[0];
          randomBottom = neutralOutfit.randomBottom[0];
          break;
        default:
          return res.status(400).json({ error: 'Invalid color harmony' });
      }
    } else if (req.query.colorMode === 'specific') {
      const seasons = req.query.seasons as string;
      const colorQuery = req.query.colors as string;
      const colors: string[] = colorQuery ? colorQuery.split(',') : [];

      const outfit: { randomTop: any[]; randomBottom: any[] } =
        await colourAndSeasonOutfit(userId, colors, seasons);
      if (!outfit.randomTop.length || !outfit.randomBottom.length) {
        return res
          .status(400)
          .json({ error: 'User does not have enough pieces' });
      }

      randomTop = outfit.randomTop[0];
      randomBottom = outfit.randomBottom[0];
    } else {
      randomTop =
        tops.length > 0 ? tops[Math.floor(Math.random() * tops.length)] : null;
      randomBottom =
        bottoms.length > 0
          ? bottoms[Math.floor(Math.random() * bottoms.length)]
          : null;
    }

    res.status(200).json({
      tops,
      bottoms,
      randomTop,
      randomBottom,
    });
  } catch (error) {
    console.error('Error fetching random slot outfit:', error);
    res.status(500).json({ error: 'Failed to pick random outfit' });
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

const removeClothesById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id || isNaN(+req.params.id)) {
      return { error: 'Id not valid' };
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

function toArray(query: string | string[] | undefined) {
  if (query === undefined) return [];
  if (Array.isArray(query)) return query;

  return [query];
}

const filterClothesByUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const queries = req.query;
    const userId: string | undefined = req.params.id;

    if (!userId || isNaN(+userId)) {
      return res.status(400).json({ error: 'User ID not valid' });
    }

    const typeQuery = toArray(queries.type as string | string[] | undefined);
    const colourQuery = toArray(
      queries.colour as string | string[] | undefined
    );
    const seasonQuery = toArray(
      queries.season as string | string[] | undefined
    );

    const filteredClothes: any[] = await filterClothes(
      Number(userId),
      typeQuery,
      colourQuery,
      seasonQuery
    );

    return res.status(200).json(filteredClothes);
  } catch (error: any) {
    console.error('Error filtering clothes:', error.message);
    return res.status(500).json({ error: 'Failed to filter clothes' });
  }
};
export default {
  listAllClothes,
  addClothes,
  listClothesByUser,
  getRandomSlotOutfit,
  removeClothesById,
  updateClothesById,
  filterClothesByUser,
};
