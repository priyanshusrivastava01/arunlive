import express from 'express';
import Hero from '../models/Hero.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) hero = new Hero(req.body);
    else Object.assign(hero, req.body);

    await hero.save();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
