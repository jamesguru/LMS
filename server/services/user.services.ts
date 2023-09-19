import { Response } from "express";
import userModel from "../models/user.model"
import { red } from "@mui/material/colors";
import { redis } from "../utils/redis";

export const getUserById = async (id: string, res: Response) => {

    const userJson = await redis.get(id);
    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(201).json({
            success: true,
            user,
        })
    }




}