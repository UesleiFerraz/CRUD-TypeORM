import { Request, Response, NextFunction } from "express";
import { User } from "../../../core/data/database/entities/User";

export default async function userAlreadyExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.body;

  const userAlreadyExists = await User.findOne({ where: { username } });

  if (userAlreadyExists) {
    return res.status(409).json({ error: "username already in use" });
  }

  next();
}
