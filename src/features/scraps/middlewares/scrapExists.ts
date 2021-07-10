import { NextFunction, Request, Response } from "express";
import { Scrap } from "../../../core/data/database/entities/Scrap";

export default async function scrapExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "parameters invalid" });
  }

  try {
    const scrapExists = await Scrap.findOne({
      where: { id, userId: req.userId },
    });

    if (!scrapExists) {
      return res.status(404).json({ error: "scrap not found" });
    }
  } catch {
    return res.status(404).json({ error: "scrap not found" });
  }

  next();
}
