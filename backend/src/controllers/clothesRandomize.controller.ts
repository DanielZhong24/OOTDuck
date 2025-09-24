import type { Request, Response } from 'express';
import { getMatchingColourOutfit } from '../models/clothes.model.js';

const randomizeMatchingColour = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userId = Number(id);

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'User ID not valid' });
  }

  const randomOutfit: { randomTop: any[]; randomBottom: any[] } =
    await getMatchingColourOutfit(userId);

  if (!randomOutfit.randomTop || !randomOutfit.randomBottom) {
    return res.status(404).json({
      error: 'Not enough clothes to form an outfit by matching colour',
    });
  }

  return res.status(200).json(randomOutfit);
};

export default { randomizeMatchingColour };
