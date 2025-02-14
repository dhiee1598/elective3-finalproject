import { DataTypes } from "sequelize";
import { UsersProps } from "../interfaces/users.props";
import sequelize from "../utilities/sequelize";

const Users = sequelize.define<UsersProps>(
  "Users",
  {
    userId: {
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
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    modelName: "Users",
    timestamps: false,
  },
);

Users.prototype.toJSON = function (): UsersProps {
  return {
    ...this.get(),
    password: undefined,
  };
};

export default Users;
