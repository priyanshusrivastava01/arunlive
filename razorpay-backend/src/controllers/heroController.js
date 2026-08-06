const Hero = require("../models/Hero");

exports.getHero = async (req, res) => {
  const hero = await Hero.findOne().sort({ updatedAt: -1 });
  res.json(hero);
};

exports.updateHero = async (req, res) => {
  let hero = await Hero.findOne();

  if (!hero) {
    hero = new Hero(req.body);
  } else {
    hero.set(req.body);
  }

  await hero.save();
  res.json(hero);
};
