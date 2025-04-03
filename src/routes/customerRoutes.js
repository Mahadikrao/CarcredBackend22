import express from 'express';
import { AadhharCard, createEnquiry, generatePip, getDashboardData , getEnquiry, quotationPDf } from '../controllers/CustomerController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { downloadPDF } from '../controllers/Pippdf.js';
import { createLoanDetail, getLoanDetails } from '../controllers/Leadgenration.js';
const router = express.Router();

router.post('/createenenquiry',  verifyToken,   createEnquiry);

router.post('/generatepip',  verifyToken,   generatePip);
 
router.get('/enquiries',  verifyToken,   getEnquiry);

router.get('/download/:filename',     downloadPDF);

router.post('/createleads', verifyToken, createLoanDetail)


router.get('/getloandetails', verifyToken,  getLoanDetails)

router.get('/getdashbordinfo', verifyToken,  getDashboardData )


router.post('/aadhharcard', verifyToken,  AadhharCard)

router.post('/quotationpdf', verifyToken,  quotationPDf)






export default router; 
