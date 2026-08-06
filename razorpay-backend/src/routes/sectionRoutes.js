// backend/src/routes/sectionRoutes.js
import { Hono } from "hono";
import { Section } from "../models/Section.js";
import { protect } from "../middleware/auth.js";
import { apiKeyProtect } from "../middleware/apiKeyAuth.js";

const router = new Hono();

// GET all sections (public)
router.get("/", async (c) => {
  try {
    const sections = await Section.find().sort({ key: 1 });
    return c.json(sections);
  } catch (err) {
    console.error(err);
    return c.json({ message: "Server error" }, 500);
  }
});

// GET all sections (protected via API key) - useful for landing page to pull latest
router.get("/public", apiKeyProtect, async (c) => {
  try {
    const sections = await Section.find().sort({ key: 1 });
    return c.json(sections);
  } catch (err) {
    console.error(err);
    return c.json({ message: "Server error" }, 500);
  }
});

// GET one section by key (public)
router.get("/:key", async (c) => {
  try {
    const key = c.req.param("key");
    const section = await Section.findOne({ key });
    if (!section) {
      return c.json({ message: "Section not found" }, 404);
    }
    return c.json(section);
  } catch (err) {
    console.error(err);
    return c.json({ message: "Server error" }, 500);
  }
});

// CREATE/UPDATE section (admin only)
router.put("/:key", protect, async (c) => {
  try {
    const key = c.req.param("key");
    const { title, subtitle, content, imageUrl, extraData } = await c.req.json();

    let section = await Section.findOne({ key });

    if (!section) {
      section = await Section.create({
        key,
        title,
        subtitle,
        content,
        imageUrl,
        extraData
      });
    } else {
      section.title = title ?? section.title;
      section.subtitle = subtitle ?? section.subtitle;
      section.content = content ?? section.content;
      section.imageUrl = imageUrl ?? section.imageUrl;
      section.extraData = extraData ?? section.extraData;
      await section.save();
    }

    return c.json(section);
  } catch (err) {
    console.error(err);
    return c.json({ message: "Server error" }, 500);
  }
});

export default router;
