import { Request, Response } from "express";
import { User } from "../../../core/data/database/entities/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: "../../../../.env" });

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find();

    users.forEach(user => {
      delete user.password;
    });

    return res.json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ error: "id not informed" });
    }

    try {
      const userExists = await User.findOne(id);

      if (!userExists) {
        return res.status(404).json({ error: "user not found" });
      }

      delete userExists.password;

      return res.json({ user: userExists });
    } catch {
      return res.status(404).json({ error: "id not found" });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "parameters invalid" });
    }

    const userAlreadyExists = await User.findOne({ where: { username } });

    if (userAlreadyExists) {
      return res.status(409).json({ error: "username already in use" });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const user = await new User({ username, password: hashPassword }).save();
    delete user.password;

    return res.json(user);
  }

  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "parameters invalid" });
    }

    const userExists = await User.findOne({ where: { username } });

    if (!userExists) {
      return res.status(401).json({ error: "username or password invalid" });
    }

    const secret = process.env.JWT_SECRET || "123";

    let token: string | undefined;
    if (userExists.password) {
      const isValidPassword = await bcrypt.compare(
        password,
        userExists.password
      );

      if (!isValidPassword) {
        return res.status(401).json({ error: "username or password invalid" });
      }

      token = jwt.sign({ id: userExists.id }, secret, { expiresIn: "1h" });
    }

    return res.json({ token });
  }
}

export default new UserController();
