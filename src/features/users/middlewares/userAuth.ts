import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config({ path: "../../../../.env" });

interface IPayLoad {
  id: string;
  iat: number;
  exp: number;
}

export default function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.replace("Bearer", "").trim();
  if (!token) {
    return res.status(401).json({ error: "you must authenticate first" });
  }

  const secret = process.env.JWT_SECRET || "123";

  try {
    const data = jwt.verify(token, secret);
    const { id } = data as IPayLoad;

    req.userId = id;
    return next();
  } catch {
    return res.status(403).json({ error: "you must authenticate first" });
  }
}
