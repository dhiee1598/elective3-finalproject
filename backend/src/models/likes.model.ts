import { LikesProps } from "../interfaces/likes.props";
import { DataTypes } from "sequelize";
import sequelize from "../utilities/sequelize";

const Likes = sequelize.define<LikesProps>(
  "Likes",
  {
    likeId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    blogId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "likes",
    modelName: "Likes",
    timestamps: false,
  },
);

export default Likes;
