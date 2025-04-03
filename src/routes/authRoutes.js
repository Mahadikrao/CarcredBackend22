import express from 'express';
import { signup, login, role, getAllStates, getAllBank, getpredifine_remark, DocumentUploads } from '../controllers/authController.js'; // Import the signup controller
import { createUserProfile, getloginUserDetils, getuserInfo} from "../controllers/userProfileController.js";
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware.js';
import { processOCR } from '../controllers/ocr.js';
import { CarColor, CarDetails, createCarVariant, getCarColor, getCarmodel, getVarients, modelTypes, modelvarientdetails } from '../controllers/cardetails.js';
import { BranchDetails, getVinByCreatedBy } from '../controllers/CustomerController.js';
import path from 'path';
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });





// Configure storage to store files on disk
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination directory for uploaded files
    cb(null, 'uploads/'); // You can specify any directory
  },
  filename: (req, file, cb) => {
    // Set the file name, optionally appending a unique timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize multer with disk storage
const upload1 = multer({ storage: storage1 });




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

router.get('/bank', verifyToken,  getAllBank);

router.get('/getpredifine_remark', verifyToken,  getpredifine_remark);



router.get('/getvinbycreatedby', verifyToken,  getVinByCreatedBy);

router.post('/Documentuploads', verifyToken, upload1.single('file'), DocumentUploads);


export default router;


