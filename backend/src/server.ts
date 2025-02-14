import ExpressConfig from "./app";
import env from "./utilities/env";
// import sequelize from "./utilities/sequelize";

const app = ExpressConfig();

app.listen(env.PORT, () => {
  console.log(`Listening: http://localhost:${env.PORT}`);
});
