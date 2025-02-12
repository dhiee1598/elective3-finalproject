import { DataTypes } from "sequelize";
import sequelize from "../utilities/sequelize";
import { BlogsProps } from "../interfaces/blogs.props";

const Blogs = sequelize.define<BlogsProps>(
  "Blogs",
  {
    blogId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "blogs",
    modelName: "Blogs",
    timestamps: true,
  },
);

export default Blogs;
