import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { GenerateAccessToken } from "../utilities/generate.token";
import jwt, { VerifyErrors } from "jsonwebtoken";
import env from "../utilities/env";

interface TokenInterface {
  userId: string;
}

export const RefreshAccessToken: RequestHandler = asyncHandler(
  async (req, res) => {
    // * Retrieve the refresh token from the request cookies
    const refreshToken = req.cookies.refreshToken;

    // * If no refresh token cookie, respond with a 401 error
    if (!refreshToken) {
      res.status(401);
      // ! Throw an error indicating the refresh token is missing
      throw new Error("Missing refresh token in the cookie.");
    }

    // * Verify the refresh token using the provided secret
    jwt.verify(
      refreshToken,
      env.REFRESH_TOKEN_SECRET,
      (
        err: VerifyErrors | null,
        decoded: string | jwt.JwtPayload | undefined,
      ) => {
        // * If there is an error, respond with a 403 error
        if (err) {
          res.status(403);
          // ! Throw an error indicating the refresh token is invalid
          throw new Error("The provided token is invalid.");
        }

        // * If refresh token is valid, generate a new access token using the decoded userId
        const user = decoded as TokenInterface;
        const newAccessToken = GenerateAccessToken(user.userId);

        // * Send the new access token in the response with message
        res.status(200).json({
          message: "New access token generated.",
          accessToken: newAccessToken,
        });
      },
    );
  },
);
