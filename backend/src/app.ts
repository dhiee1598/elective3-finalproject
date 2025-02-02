import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import env from "./utilities/env";
import { NotFound, ErrorHandler } from "./middlewares/error.handler";
import UserRoutes from "./routes/users.route";
import TokenRoutes from "./routes/token.route";

const ExpressConfig = (): Application => {
  const app = express();

  // * MIDDLEWARE SETUP
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: env.FRONTEND_URL,
    }),
  );

  // * MAIN HEALTH CHECK ROUTE
  app.get("/main/healthcheck", (_req: Request, res: Response) => {
    res.status(200).json({ message: "HAPPY CODING - 👋✨🌍" });
  });

  // * API ROUTES FOR TOKEN
  app.use("/auth/token", TokenRoutes);

  // * API ROUTES FOR USERS
  app.use("/api/users", UserRoutes);

  // ! CATCH ALL ERROR HANDLING
  app.use(NotFound); // Handle 404 errors (Not Found)
  app.use(ErrorHandler); // Handle all other errors

  return app;
};

export default ExpressConfig;
