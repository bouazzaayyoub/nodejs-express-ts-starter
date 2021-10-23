import app from "./app";

const PORT = process.env.port || 5020;

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server Started on port ${PORT}`);
});
