// backend/src/middleware/apiKeyAuth.js
import { createMiddleware } from "hono/factory";

export const apiKeyProtect = createMiddleware(async (c, next) => {
  const keyHeader = c.req.header("x-api-key") || c.req.header("x-api_key");
  const keyQuery = c.req.query("api_key");
  const provided = keyHeader || keyQuery;
  const expected = c.env.LANDING_API_KEY || "";

  if (!expected) {
    // If no key configured, reject to avoid accidental public exposure
    return c.json({ message: "Server not configured for API key access" }, 403);
  }

  if (!provided || provided !== expected) {
    return c.json({ message: "Invalid API key" }, 401);
  }

  await next();
});
