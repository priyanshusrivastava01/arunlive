import express from 'express';
import { getLiveBanner, updateLiveBanner } from '../controllers/liveBannerController.js';
import { adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getLiveBanner);           // website - public
router.put('/', adminOnly, updateLiveBanner); // admin - protected

export default router;
