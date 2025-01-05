import express from 'express';
import { recommendations } from '../controller/appController.js';

const router = express.Router();

router.post('/', recommendations);

export default router;  
