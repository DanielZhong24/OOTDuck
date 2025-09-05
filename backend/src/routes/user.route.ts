import { Router } from "express";
import usersController from "../controllers/user.controller.js";

const router: Router = Router();

router.get("/", usersController.listAllUsers);
router.get("/:id", usersController.listUserById);

export default router;