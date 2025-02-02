import "dotenv/config";

import { cleanEnv, num, port, str, url } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port(),
  SERVER_URL: url(),
  FRONTEND_URL: url(),
  NODE_ENV: str({ choices: ["development", "production"] }),
  CONNECTION_URI: url(),
  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
  COOKIE_EXPIRATION_DAYS: num(),
});

export default env;
