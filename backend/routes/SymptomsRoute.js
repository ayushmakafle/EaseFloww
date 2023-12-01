import express from 'express';
import { requireSignIn } from '../middleware/authMiddleware.js';
import {
    createSymptoms,
    updateSymptoms,
    getAllSymptoms,
    getSymptomsByUserId,
    deleteSymptoms,
} from '../controllers/symptomsController.js';

const router = express.Router();

// Create symptoms
router.post('/create-symptoms', requireSignIn, createSymptoms);

// Update symptoms
router.put('/update-symptoms/:user_id', requireSignIn, updateSymptoms);

// Get all symptoms
router.get('/get-all-symptoms', getAllSymptoms);

// Get symptoms by user ID
router.get('/get-symptoms/:user_id', requireSignIn, getSymptomsByUserId);

// Delete symptoms
router.delete('/delete-symptoms/:user_id', requireSignIn, deleteSymptoms);

export default router;
