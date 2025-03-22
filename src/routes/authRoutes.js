import express from 'express';
import { signup, login, role, getAllStates } from '../controllers/authController.js'; // Import the signup controller
import { createUserProfile, getloginUserDetils, getuserInfo} from "../controllers/userProfileController.js";
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware.js';
import { processOCR } from '../controllers/ocr.js';
import { CarColor, CarDetails, createCarVariant, getCarColor, getCarmodel, getVarients, modelTypes, modelvarientdetails } from '../controllers/cardetails.js';
import { BranchDetails } from '../controllers/CustomerController.js';
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });

const router = express.Router();

// POST route for user signup
router.post('/signup', signup);
router.post('/login', login);


router.post('/users', verifyToken,  upload.single('profile_image'), createUserProfile);
router.post('/ocr',   upload.single('profile_image'),  processOCR );
router.post('/cardetails',   upload.single('car_image'),  CarDetails );
router.post('/carcolordetails',  upload.single('car_image'),  CarColor);
router.post('/carvariant',    createCarVariant);

router.get('/userinfo', verifyToken,  getuserInfo);

router.get('/loginprofile', verifyToken,  getloginUserDetils);

router.get('/branchdetails', verifyToken,  BranchDetails);

router.get('/role', verifyToken,  role);

router.get('/getCarmodel', verifyToken,  getCarmodel);

router.post('/getcarcolor', verifyToken,  getCarColor);


router.get('/getvarients', verifyToken, getVarients);
router.get('/modelvarientdetails', verifyToken,  modelvarientdetails);
router.get('/modelTypes', verifyToken,  modelTypes);

router.get('/states', verifyToken,  getAllStates);


export default router;


