import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';  
dotenv.config();


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;



// Middleware to verify the token
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }
 

  try {
    // Verify the token using the JWT_SECRET_KEY
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
   
    req.user = decoded;  // Attach the decoded user data to the request object
    next();  // Pass control to the next middleware/route
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};


