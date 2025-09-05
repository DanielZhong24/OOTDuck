import type { Request, Response } from "express";
import { getAllUsers, getUserById } from "../models/user.model.js";

const listAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const listUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default {
  listAllUsers,
  listUserById,
};
