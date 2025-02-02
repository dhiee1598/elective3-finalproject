import { Response } from "express";
import env from "./env";

// * Store a cookie with the specified name and value in the response
const StoreCookieToken = (res: Response, name: string, value: string) => {
  return res.cookie(name, value, {
    httpOnly: true, // Ensure the cookie is accessible only via HTTP(S) and not client-side JavaScript
    expires: new Date(
      Date.now() + env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000,
    ),
  });
};

export default StoreCookieToken;
