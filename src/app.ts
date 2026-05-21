import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import GlobalErrorHandler from "./middlewares/GlobalErrorHandler";
import authRouter from "./api/routes/auth.route";

const app: Application = express();

app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(GlobalErrorHandler);

export default app;
