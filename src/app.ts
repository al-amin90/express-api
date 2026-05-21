import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import GlobalErrorHandler from "./middlewares/GlobalErrorHandler";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(GlobalErrorHandler);

export default app;
