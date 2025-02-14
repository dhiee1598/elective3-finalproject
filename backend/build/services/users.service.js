"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersById = exports.InsertUsers = exports.GetUsersByEmail = void 0;
const models_1 = require("../models");
// Function to get a user by email
const GetUsersByEmail = async (email) => {
    try {
        return await models_1.Users.findOne({ where: { email } });
    }
    catch (error) {
        throw new Error(error instanceof Error
            ? error.message
            : "Failed to fetch data! Please try again.");
    }
};
exports.GetUsersByEmail = GetUsersByEmail;
// Function to insert a new user
const InsertUsers = async (values) => {
    try {
        return await models_1.Users.create({
            ...values,
            image_path: "/images/default_image.png",
            isAdmin: false,
        });
    }
    catch (error) {
        throw new Error(error instanceof Error
            ? error.message
            : "Failed to insert data! Please try again.");
    }
};
exports.InsertUsers = InsertUsers;
// Function to get a user by ID
const GetUsersById = async (id) => {
    try {
        return await models_1.Users.findByPk(id);
    }
    catch (error) {
        throw new Error(error instanceof Error
            ? error.message
            : "Failed to fetch User data! Please try again.");
    }
};
exports.GetUsersById = GetUsersById;
