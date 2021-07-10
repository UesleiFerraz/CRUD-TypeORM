import { NextFunction, Request, Response } from "express";

export default function validBodyRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "parameters invalid" });
  }

  if (title.length > 50) {
    return res.status(400).json({
      error: "title must have in maximum 50 characters",
    });
  }

  next();
}
