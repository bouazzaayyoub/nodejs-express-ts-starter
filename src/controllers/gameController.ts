import { NextFunction, Request, Response } from "express";
import prisma from "../config/prismadb";

export const createElement = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { name, gamers } = req.body;
    const element = await prisma.game.findUnique({
      where: {
        name,
      },
    });

    if (element) {
      res.json({ message: "user alredy exist" });
    } else {
      const newElement = await prisma.game.create({
        data: {
          name,
          gamers: {
            connectOrCreate: gamers.map((game: string) => ({
              where: {
                name: game,
              },
              create: {
                name: game,
              },
            })),
          },
        },
      });

      res.json(newElement);
    }
  } catch (error: any) {
    // tslint:disable-next-line:no-console
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllElement = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const elementsList = await prisma.game.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.json(elementsList);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateElement = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { name, gamers } = req.body;
    const { id } = req.params;

    const updatedElment = await prisma.game.update({
      where: {
        id,
      },
      data: {
        name,
        gamers: {
          connectOrCreate: gamers.map((game: string) => ({
            where: {
              name: game,
            },
            create: {
              name: game,
            },
          })),
        },
      },
    });
    res.json(updatedElment);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteElement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedElement = await prisma.game.delete({
      where: {
        id,
      },
    });
    res.json(deletedElement);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteElementByName = async (req: Request, res: Response) => {
  const name = req.query.name as string | undefined;
  try {
    const deletedElement = await prisma.game.delete({
      where: { name },
    });
    res.json(deletedElement);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
