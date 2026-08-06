// Database Migration Script (Run once in backend)
// File: admin panel/backend/src/migrations/updateHeroFields.js

const Hero = require("../models/Hero");

async function migrateHeroFields() {
  try {
    const hero = await Hero.findOne();
    
    if (!hero) {
      console.log("No hero record found");
      return;
    }

    // If old fields exist, migrate them
    if (hero.cta1Link || hero.cta2Link) {
      console.log("Migrating old fields...");
      
      hero.cta1Section = hero.cta1Section || "services";
      hero.cta2Section = hero.cta2Section || "pricing";
      
      // Remove old fields
      hero.cta1Link = undefined;
      hero.cta2Link = undefined;
      
      await hero.save();
      console.log("✅ Migration complete!");
    } else {
      console.log("Already migrated or no old fields found");
    }
  } catch (err) {
    console.error("Migration error:", err);
  }
}

// Run it
// migrateHeroFields();

module.exports = migrateHeroFields;
