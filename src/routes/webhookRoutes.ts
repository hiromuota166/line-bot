import express from 'express';
import { webhookHandler } from '../controllers/webhookController';

const router = express.Router();

router.post('/', webhookHandler);

export default router;
