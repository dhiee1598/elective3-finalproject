import ExpressConfig from "./app";
import env from "./utilities/env";
import sequelize from "./utilities/sequelize";

const app = ExpressConfig();

// * Sync the Sequelize connection with the database
sequelize
  .sync()
  .then(() => console.log("Connection has been established successfully"))
  .catch((error) => console.log(`Unable to connect to the database. ${error}`));

// * Start the server and listen on the specified port
app.listen(env.PORT, () => {
  console.log(`Listening: http://localhost:${env.PORT}`);
});
