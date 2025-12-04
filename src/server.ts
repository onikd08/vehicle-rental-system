import express, { Request, Response } from "express";
import config from "./config";

const app = express();
const port = config.port;

app.get("/", (req: Request, res: Response) => {
  res.send("Server started!");
});

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
