import { Request, Response } from "express";
import { Scrap } from "../../../core/data/database/entities/Scrap";

class ScrapController {
  public async index(req: Request, res: Response): Promise<Response> {
    const scraps = await Scrap.find({
      where: { userId: req.userId },
      order: { createdAt: "DESC" },
    });

    return res.json({ scraps });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "parameters invalid" });
    }

    const scrapExists = await Scrap.findOne({
      where: { id, userId: req.userId },
    });

    return res.json({ scrap: scrapExists });
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;

    const scrap = await new Scrap({
      title,
      description,
      userId: req.userId,
    }).save();

    return res.json({ scrap });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;

    const scrapExists = await Scrap.findOne(id);

    if (scrapExists) {
      scrapExists.title = title;
      scrapExists.description = description;

      await scrapExists.save();

      return res.json({ scrap: scrapExists });
    }

    return res.sendStatus(500);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "parameters invalid" });
    }

    await Scrap.delete(id);
    return res.sendStatus(204);
  }
}

export default new ScrapController();
