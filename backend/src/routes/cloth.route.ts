import {Router} from "express";
import clothesController from "../controllers/cloth.controller.js";

const router: Router = Router();

router.get('/',clothesController.listAllClothes);

export default router;