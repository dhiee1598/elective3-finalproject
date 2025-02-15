import { UsersNewRequest, UsersUpdateRequest } from "../interfaces/users.props";
import { Users } from "../models";

// Function to get a user by email
export const GetUsersByEmail = async (email: string) => {
  try {
    return await Users.findOne({ where: { email } });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch data! Please try again.",
    );
  }
};

// Function to insert a new user
export const InsertUsers = async (values: UsersNewRequest) => {
  try {
    return await Users.create({
      ...values,
      image_path: "/images/default_image.png",
      isAdmin: false,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to insert data! Please try again.",
    );
  }
};

// Function to get a user by ID
export const GetUsersById = async (id: string) => {
  try {
    return await Users.findByPk(id);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch User data! Please try again.",
    );
  }
};

// Function to update a user by ID
export const UpdateUsersById = async (
  updateData: UsersUpdateRequest,
  userId: string,
) => {
  try {
    return await Users.update(updateData, {
      where: { userId },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to update User data! Please try again.",
    );
  }
};
