import express from 'express';
import { createEnquiry, generatePip, getEnquiry } from '../controllers/CustomerController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { downloadPDF } from '../controllers/Pippdf.js';
const router = express.Router();

router.post('/createenenquiry',  verifyToken,   createEnquiry);

router.post('/generatepip',  verifyToken,   generatePip);

router.get('/enquiries',  verifyToken,   getEnquiry);

router.get('/download/:filename',     downloadPDF);




export default router; 
