import express, { Request, Response } from "express";
import sendJson from "./helper/sendJson";

const app = express();

// Parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const data = {
    success: true,
    message: "Root path, Server is running",
    data: null,
  };
  sendJson(res, data, 200);
});

// Not found route
app.use((req: Request, res: Response) => {
  const data = {
    success: false,
    message: "Unknown path",
    error: "Path does not exist",
  };
  sendJson(res, data, 404);
});

export default app;
