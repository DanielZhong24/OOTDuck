import { Router } from 'express';
import clothesController from '../controllers/clothes.controller.js';
import multer from 'multer';
const router: Router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', clothesController.listAllClothes);
router.post('/', upload.single('image'), clothesController.addClothes);
router.get('/random/:id', clothesController.getRandomSlotOutfit);
router.get('/user/:id', clothesController.listClothesByUser);
router.get('/user/:id/filter', clothesController.filterClothesByUser);
router.delete('/delete/:id', clothesController.removeClothesById);
router.put('/:id', clothesController.updateClothesById);
export default router;
