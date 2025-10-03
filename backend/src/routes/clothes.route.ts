import { Router } from 'express';
import clothesController from '../controllers/clothes.controller.js';
import multer, { type Multer } from 'multer';
import type { Request, Response, NextFunction } from 'express';
import supabase from '../config/supabase.js';

const router: Router = Router();

const upload: multer.Multer = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 10 ** 6 },
});

const authenticateJWTMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authHeader: string | undefined = req.headers.authorization;
    if (authHeader) {
      const token: string | undefined = authHeader.split(' ')[1];

      const {
        data: { user },
      } = await supabase.auth.getUser(token);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      } else {
        next();
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error: any) {
    return res.status(400).json({ message: 'An unexpected error occurred.' });
  }
};

const checkFileSize = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    return res.status(403).json({ error: 'File size too big' });
  }

  next();
};

router.get('/', authenticateJWTMiddleware, clothesController.listAllClothes);

router.post(
  '/',
  upload.single('image'),
  authenticateJWTMiddleware,
  checkFileSize,
  clothesController.addClothes
);
router.get(
  '/random/:id',
  authenticateJWTMiddleware,
  clothesController.getRandomSlotOutfit
);
router.get(
  '/user/:id',
  authenticateJWTMiddleware,
  clothesController.listClothesByUser
);
router.get(
  '/user/:id/filter',
  authenticateJWTMiddleware,
  clothesController.filterClothesByUser
);
router.delete(
  '/delete/:id',
  authenticateJWTMiddleware,
  clothesController.removeClothesById
);
router.put(
  '/:id',
  authenticateJWTMiddleware,
  clothesController.updateClothesById
);
export default router;
