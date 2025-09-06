import {Router} from "express";
import clothesController from "../controllers/cloth.controller.js";

const router: Router = Router();

router.get('/',clothesController.listAllClothes);
router.post('/',clothesController.addClothes);
export default router;