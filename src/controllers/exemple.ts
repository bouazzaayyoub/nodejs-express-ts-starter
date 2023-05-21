import { NextFunction, Request, Response } from "express";
import { ExampleModel } from "../models/Example";

export const createExample = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const example = new ExampleModel({
    exampleName: req.body.exampleName,
    key: req.body.key,
  });
  example
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
        data: example,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

export const getAll = (_req: Request, res: Response, _next: NextFunction) => {
  ExampleModel.find()
    .then((examples) => {
      res.status(200).json(examples);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
