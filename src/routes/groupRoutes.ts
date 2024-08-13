import express from 'express';
import { getGroups } from '../controllers/groupController';

const router = express.Router();

router.get('/groups', getGroups);

export default router;
