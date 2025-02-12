import Users from "./users.model";
import Blogs from "./blogs.model";

// 1:M
Users.hasMany(Blogs, { foreignKey: "userId" });
Blogs.belongsTo(Users, { foreignKey: "userId" });

export { Users, Blogs };
