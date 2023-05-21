import { Response, Request } from "express";
import {
  LoginPayload,
  RegisterPayload,
  login,
  register,
} from "../services/auth";

export async function registerController(req: Request, res: Response) {
  const payload = req.body as unknown as RegisterPayload;
  try {
    const newUser = await register({
      email: payload.email,
      password: payload.password,
      username: payload.username,
    });
    res.json(newUser);
  } catch (error: any) {
    res.status(500).json({
      message: `Internal Server Error, ${JSON.stringify(error.message)}`,
    });
  }
}

export async function loginController(req: Request, res: Response) {
  const payload = req.body as unknown as LoginPayload;
  try {
    const token = await login({
      password: payload.password,
      username: payload.username,
    });
    res.header("auth-token", token).send({ token });
  } catch (error: any) {
    res.json(error.message);
  }
}
