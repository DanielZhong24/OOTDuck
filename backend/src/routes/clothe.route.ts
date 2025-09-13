import { Router } from 'express';
import clothesController from '../controllers/clothe.controller.js';
import multer from 'multer';
import path from 'path';
const router: Router = Router();


const upload = multer({ storage: multer.memoryStorage() });

router.get('/', clothesController.listAllClothes);
router.post('/', upload.single('image'), clothesController.addClothes);
router.get('/:id', clothesController.listClothesByUser);

export default router;
