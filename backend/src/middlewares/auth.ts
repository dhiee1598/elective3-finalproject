import asyncHandler from "express-async-handler";
import jwt, { VerifyErrors } from "jsonwebtoken";
import env from "../utilities/env";

interface TokenInterface {
  userId: string;
}

const RequiredAuthentication = asyncHandler(async (req, res, next) => {
  // * Extract access token from Authorization header
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  // * Check if access token exists
  if (!accessToken) {
    res.status(401);
    // ! Throw Error if access token is missing
    throw new Error("Authorization header with token is required.");
  }

  // * Verify the access token using the secret key
  jwt.verify(
    accessToken,
    env.ACCESS_TOKEN_SECRET,
    (
      err: VerifyErrors | null,
      decoded: string | jwt.JwtPayload | undefined,
    ) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(401);
          // ! Throw Error if token expired
          throw new Error("The provided token has expired.");
        }

        res.status(403);
        // ! Throw Error if token verification fails
        throw new Error("The provided token is invalid.");
      }

      const user = decoded as TokenInterface;

      // * Store the decoded user ID in the request object for further use
      req.userId = user.userId;
      next();
    },
  );
});

export default RequiredAuthentication;
