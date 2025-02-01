import { Sequelize } from "sequelize";
import env from "./env";
import pg from "pg";

let sequelize: Sequelize;

if (env.NODE_ENV === "production") {
  sequelize = new Sequelize(env.CONNECTION_URI, {
    dialectModule: pg,
    dialect: "postgres",
  });
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "dbsqlite.sqlite3",
  });
}

export default sequelize;
