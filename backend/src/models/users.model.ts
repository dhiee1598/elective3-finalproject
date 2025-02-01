import { DataTypes } from "sequelize";
import { UserProps } from "../interfaces/user.props";
import sequelize from "../utilities/sequelize";

const Users = sequelize.define<UserProps>(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    modelName: "Users",
    timestamps: false,
  },
);

Users.prototype.toJSON = function (): UserProps {
  return {
    ...this.get(),
    password: undefined,
  };
};

export default Users;
