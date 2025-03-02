import { CommentProps } from "../interfaces/comments.props";
import { DataTypes } from "sequelize";
import sequelize from "../utilities/sequelize";

const Comments = sequelize.define<CommentProps>(
  "Comments",
  {
    commentId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: "comments",
    modelName: "Comments",
    timestamps: true,
  },
);

export default Comments;
