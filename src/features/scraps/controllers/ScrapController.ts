import { Request, Response } from "express";
import { Scrap } from "../../../core/data/database/entities/Scrap";

class ScrapController {
  public async index(req: Request, res: Response): Promise<Response> {
    const scraps = await Scrap.find({ where: { user_id: req.userId } });

    return res.json(scraps);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "parameters invalid" });
    }

    try {
      const scrapExists = await Scrap.findOne({
        where: { id, user_id: req.userId },
      });

      if (!scrapExists) {
        return res.status(404).json({ error: "scrap not found" });
      }

      return res.json({ scrap: scrapExists });
    } catch {
      return res.status(404).json({ error: "scrap not found" });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "parameters invalid" });
    }

    if (title.length > 50) {
      return res
        .status(400)
        .json({ error: "title must have in maximum 50 characters" });
    }

    const scrap = await new Scrap({ title, description }).save();

    return res.json({ scrap });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { userId } = req;
    const { title, description } = req.body;

    if (!title || !description || !id) {
      return res.status(400).json({ error: "parameters invalid" });
    }

    if (title.length > 50) {
      return res
        .status(400)
        .json({ error: "title must have in maximum 50 characters" });
    }

    try {
      const scrapExists = await Scrap.findOne(id);

      if (!scrapExists) {
        return res.status(404).json({ error: "scrap not found" });
      }

      if (scrapExists.user.id !== userId) {
        return res
          .status(401)
          .json({ error: "you dont have permission to update this scrap" });
      }

      scrapExists.title = title;
      scrapExists.description = description;

      await scrapExists.save();

      return res.json({ scrap: scrapExists });
    } catch {
      return res.status(404).json({ error: "scrap not found" });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "parameters invalid" });
    }

    try {
      const scrapExists = await Scrap.findOne(id);

      if (!scrapExists) {
        return res.status(404).json({ error: "scrap not found" });
      }

      if (scrapExists.user.id !== req.userId) {
        return res
          .status(401)
          .json({ error: "you dont have permission to delete this scrap" });
      }

      await Scrap.delete(id);
      return res.sendStatus(204);
    } catch {
      return res.status(404).json({ error: "scrap not found" });
    }
  }
}

export default new ScrapController();
