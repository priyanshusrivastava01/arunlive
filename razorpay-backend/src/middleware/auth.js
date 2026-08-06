import jwt from "jsonwebtoken";
import { createMiddleware } from "hono/factory";

export const protect = createMiddleware(async (c, next) => {
  const authorization = c.req.header("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, c.env.JWT_SECRET);
      c.set("admin", decoded);
      await next();
    } catch (err) {
      console.error(err);
      return c.json({ message: "Not authorized, token failed" }, 401);
    }
  } else {
    return c.json({ message: "Not authorized, no token" }, 401);
  }
});
