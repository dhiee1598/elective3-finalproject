import Users from "./users.model";
import Blogs from "./blogs.model";
import Likes from "./likes.model";

// User can have multiple blogs
Users.hasMany(Blogs, { foreignKey: "userId", onDelete: "CASCADE" });
Blogs.belongsTo(Users, { foreignKey: "userId" });

// Blog can have multiple likes
Blogs.hasMany(Likes, { foreignKey: "blogId", onDelete: "CASCADE" });
Likes.belongsTo(Blogs, { foreignKey: "blogId" });

// A Like belongs to a User (who liked the blog)
Likes.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE" });
Users.hasMany(Likes, { foreignKey: "userId" });

export { Users, Blogs, Likes };
