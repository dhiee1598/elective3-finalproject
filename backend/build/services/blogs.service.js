"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchSingleBlogsByID = exports.FetchAllBlogs = exports.FetchAllBlogsByUser = exports.InsertBlogs = void 0;
const models_1 = require("../models");
// Function to insert a new blogs
const InsertBlogs = async (values, userId) => {
    try {
        return await models_1.Blogs.create({ ...values, userId: userId });
    }
    catch (error) {
        throw new Error(error instanceof Error
            ? error.message
            : "Failed to insert data! Please try again.");
    }
};
exports.InsertBlogs = InsertBlogs;
// Function to get all blogs by userId
const FetchAllBlogsByUser = async (id) => {
    try {
        return await models_1.Blogs.findAll({ where: { userId: id } });
    }
    catch (error) {
        throw new Error(error instanceof Error
            ? error.message
            : "Failed to fetch all Users Blogs! Please try again.");
    }
};
exports.FetchAllBlogsByUser = FetchAllBlogsByUser;
// Function to get a blogs
const FetchAllBlogs = async () => {
    try {
        return await models_1.Blogs.findAll({
            include: models_1.Users,
        });
    }
    catch (error) {
        throw new Error(error instanceof Error
            ? error.message
            : "Failed to fetch all Blogs! Please try again.");
    }
};
exports.FetchAllBlogs = FetchAllBlogs;
// Function to get a single blogs
const FetchSingleBlogsByID = async (blogId) => {
    try {
        return await models_1.Blogs.findByPk(blogId, { include: models_1.Users });
    }
    catch (error) {
        throw new Error(error instanceof Error
            ? error.message
            : "Failed to fetch all Blogs! Please try again.");
    }
};
exports.FetchSingleBlogsByID = FetchSingleBlogsByID;
