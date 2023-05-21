import prisma from "../config/prismadb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
export async function register(payload: RegisterPayload) {
  try {
    const existedUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (existedUser) {
      throw new Error("user already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
        username: payload.username,
      },
    });
    return newUser;
  } catch (error) {
    throw error;
  }
}

export interface LoginPayload {
  username: string;
  password: string;
}

export async function login({ password, username }: LoginPayload) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new Error("user not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("incorrect password");
    }
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET as string);
    return token;
  } catch (error) {
    throw error;
  }
}
