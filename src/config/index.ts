import dotenv from "dotenv";
import { env } from "process";

dotenv.config({ quiet: true });

export const config = {
  database_url: env.DATABASE_URL as string,
  port: env.PORT as string,
  secret: env.JWT_SECRET as string,
  refresh_secret: env.JWT_REFRESH_SECRET as string,
  node_env: env.NODE_ENV as string,
};
