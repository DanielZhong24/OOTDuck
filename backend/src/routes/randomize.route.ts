import { Router } from 'express';
import clothesRandomizeController from '../controllers/clothesRandomize.controller.js';

const router: Router = Router();

router.get('/match/:id', clothesRandomizeController.randomizeMatchingColour);
