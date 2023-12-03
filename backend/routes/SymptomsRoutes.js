// import express from 'express';
// import { requireSignIn } from '../middleware/authMiddleware.js';
// import {
//     createSymptoms,
//     updateSymptoms,
//     getAllSymptoms,
//     getSymptomsByUserId,
//     deleteSymptoms,
// } from '../controllers/SymptomsController.js';
// import SymptomsController from '../controllers/SymptomsController.js'; // Import the entire controller object


// const router = express.Router();

// router.post('/:user_id/create', requireSignIn, SymptomsController.createSymptoms);
// router.put('/:user_id/update', requireSignIn, SymptomsController.updateSymptoms);
// router.get('/all', SymptomsController.getAllSymptoms); // Access the named export directly
// router.get('/:user_id', requireSignIn, SymptomsController.getSymptomsByUserId);
// router.delete('/:user_id/delete', requireSignIn, SymptomsController.deleteSymptoms);


// export default router;
import express from 'express';
import { requireSignIn } from '../middleware/authMiddleware.js';
import * as SymptomsController from '../controllers/SymptomsController.js'; // Import the entire controller object

const router = express.Router();

router.post('/:user_id/create', requireSignIn, SymptomsController.createSymptoms);
router.put('/:user_id/update', requireSignIn, SymptomsController.updateSymptoms);
router.get('/all', SymptomsController.getAllSymptoms);
router.get('/:user_id', requireSignIn, SymptomsController.getSymptomsByUserId);
router.delete('/:user_id/delete', requireSignIn, SymptomsController.deleteSymptoms);

export default router;
