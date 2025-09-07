import { Router } from 'express';
import clothesController from '../controllers/cloth.controller.js';
import multer from 'multer';
import path from 'path';
const router: Router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'src', 'img'));
  },
  filename: function (req, file, cb) {
    //should we do some dumbass suffix?
    const suffix = 'DA' + Date.now() + '-' + Math.round(Math.random() * 10000);
    const ext = path.extname(file.originalname); // preserve extension
    cb(null, suffix + ext);
  },
});

const upload = multer({ storage });

router.get('/', clothesController.listAllClothes);
router.post('/', upload.single('image'), clothesController.addClothes);
router.get('/:id', clothesController.listClothesByUser);

export default router;
