import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface UserProps
  extends Model<
    InferAttributes<UserProps>,
    InferCreationAttributes<UserProps>
  > {
  id: CreationOptional<string>;
  name: string;
  email: string;
  password: string;
}
