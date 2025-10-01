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
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ error: "No user id" });
      return; 
    }

    const user = await getUserById(id); 
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

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
