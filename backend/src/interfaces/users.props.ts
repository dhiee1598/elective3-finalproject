import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface UsersProps
  extends Model<
    InferAttributes<UsersProps>,
    InferCreationAttributes<UsersProps>
  > {
  userId: CreationOptional<string>;
  name: string;
  email: string;
  password: string;
  image_path: string;
  isAdmin: boolean;
}

export interface UsersNewRequest {
  name: string;
  email: string;
  password: string;
}

export interface UsersResponse {
  message?: string;
  users?: UsersProps | UsersProps[];
  accessToken?: string;
}

export interface UsersAuthRequest {
  email: string;
  password: string;
}

export interface UsersUpdateRequest {
  name: string;
  email: string;
  image_path: string;
}

export interface UsersParams {
  userId: string;
}
