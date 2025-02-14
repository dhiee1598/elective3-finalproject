import ExpressConfig from "./app";
import env from "./utilities/env";
// import sequelize from "./utilities/sequelize";

const app = ExpressConfig();

const StartServer = async (): Promise<void> => {
  try {
    // * Sync the Sequelize connection with the database to ensure models are updated
    // await sequelize.sync();
    // console.log("Connection has been established successfully");

    // * Start the server and listen on the specified port
    app.listen(env.PORT, () => {
      console.log(`Listening: http://localhost:${env.PORT}`);
    });
  } catch (error) {
    // ! Log an error message if unable to connect to the database
    console.log(`Unable to connect to the database. ${error}`);
  }
};

StartServer();
