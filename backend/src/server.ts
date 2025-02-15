import ExpressConfig from "./app";
import env from "./utilities/env";
import sequelize from "./utilities/sequelize";

const app = ExpressConfig();

sequelize
  .sync()
  .then(() => console.log("Connection has been established successfully"))
  .catch((error) => console.log(`Unable to connect to the database. ${error}`));

app.listen(env.PORT, () => {
  console.log(`Listening: http://localhost:${env.PORT}`);
});
