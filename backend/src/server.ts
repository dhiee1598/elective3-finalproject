import ExpressConfig from "./app";
import env from "./utilities/env";

const app = ExpressConfig();

const StartServer = async (): Promise<void> => {
  try {
    // * Start the server and listen on the specified port
    app.listen(env.PORT, () => {
      console.log(`Listening: ${env.SERVER_URL}:${env.PORT}`);
    });
  } catch (error) {
    // ! ON GOING PAG CONNECT SA DATABASE
    console.log(`Unable to connect to the database. ${error}`);
  }
};

StartServer();
