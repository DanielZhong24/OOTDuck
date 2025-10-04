import { Router } from 'express';
import clothesController from '../controllers/clothes.controller.js';
import multer, { type Multer } from 'multer';
import type { Request, Response, NextFunction } from 'express';

const router: Router = Router();

const upload: multer.Multer = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 10 ** 6 },
});


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

router.get('/', clothesController.listAllClothes);

router.post(
  '/',
  upload.single('file'),
  checkFileSize,
  clothesController.addClothes
);
router.get(
  '/random/:id',
  clothesController.getRandomSlotOutfit
);
router.get(
  '/user/:id',
  clothesController.listClothesByUser
);
router.get(
  '/user/:id/filter',
  clothesController.filterClothesByUser
);
router.delete(
  '/delete/:id',
  clothesController.removeClothesById
);
router.put(
  '/:id',
  clothesController.updateClothesById
);
export default router;
