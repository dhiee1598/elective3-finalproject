import "dotenv/config";

import { cleanEnv, port, str, url } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port(),
  SERVER_URL: url(),
  FRONTEND_URL: url(),
  NODE_ENV: str({ choices: ["development", "production"] }),
});

export default env;
