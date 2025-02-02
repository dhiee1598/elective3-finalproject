import jwt from "jsonwebtoken";
import env from "./env";

// * Function to generate an access token for a given user ID
export const GenerateAccessToken = (id: string) => {
  return jwt.sign({ userId: id }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

// * Function to generate a refresh token for a given user ID
export const GenerateRefreshToken = (id: string) => {
  return jwt.sign({ userId: id }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
