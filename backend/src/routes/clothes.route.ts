import { Router } from 'express';
import clothesController from '../controllers/clothes.controller.js';
import multer from 'multer';
const router: Router = Router();


const upload = multer({ storage: multer.memoryStorage() });

router.get('/', clothesController.listAllClothes);
router.post('/', upload.single('image'), clothesController.addClothes);
router.get('/:id', clothesController.listClothesByUser);


export default router;
