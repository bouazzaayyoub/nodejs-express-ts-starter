import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.port || 5020;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
