import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';  
// import { createConnection } from '../utils/db.js';


import User from "../models/User.js"
import RoleResponsibility from '../models/RoleResponsibility.js';

import Branch from '../models/branch.js';
import DealerDetails from '../models/dealer_details.js';
import UserWorkLocation from '../models/UserworkLocation.js';
import States from '../models/States.js';
import Bank from '../models/Bank.js';
import predifine_remark from '../models/predifine_remark.js';
import path from 'path';
// Signup Controller


export const signup = async (req, res) => {
  const { username, email, password,  role } = req.body;
  

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the email already exists in the database using Sequelize
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database using Sequelize
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    // Send response with the new user data (excluding password)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role : newUser.role
      },
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   // Validate input
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     // Create a connection to the database
//     const connection = await createConnection(); // Use the promise-based connection

//     // Check if the user exists in the database
//     const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

//     if (results.length === 0) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare the password with the hashed password in the database
//     const user = results[0];
//     const isPasswordValid = await bcrypt.compare(password, user.password); // Use bcrypt.compare with async/await

//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Generate a JWT token (payload contains user ID and email)
//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET_KEY,  // Secret key for signing the token
//       { expiresIn: '1d' }  // Token expiration time (1 hour in this case)
//     );

//     // Return a success response with the token
//     res.status(200).json({
//       message: 'Login successful',
//       token,  // Send the token to the client
//       user: {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//       },
//     });

//     // Close the connection
//     await connection.end(); // Close the connection gracefully

//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


export const login = async (req, res) => {

  const {mobile_registered, password } = req.body;
  
   
 
 

  // Validate input
  if (!mobile_registered|| !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the user exists in the database using Sequelize
    const user = await User.findOne({ where: {  mobile_registered } });
   
    

    

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password in the database


    const userLocation = await  UserWorkLocation.findOne({
      where: { user_id: user.user_id },
    });

     
   
    if (!userLocation) {
      return res.status(404).json({ message: "User location not found" });
    }

    const Branchdata = await Branch.findOne({
      where: { branch_id: userLocation.location_id },
    });

 

    if (!Branchdata) {
      return res.status(404).json({ message: "Branch details not found" });
    }

    



  




    if (password!== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token (payload contains user ID and email)
    const token = jwt.sign(
      { id: user.user_id,   role: user.role_id, branch_id : Branchdata?.branch_id,  dealer_id :  Branchdata?. dealer_id },
      process.env.JWT_SECRET_KEY,  // Secret key for signing the token
      { expiresIn: '30d' }  // Token expiration time (1 day in this case)
    );


   
    
    // Return a success response with the token
    res.status(200).json({
      message: 'Login successful',
      token,
      role_id : user.role_id
        // Send the token to the client
      
     
    });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





export const role = async (req, res) => {
    try {
       const role = req.user.role ;
       

        // Find roles associated with the given responsibility
        const roles = await RoleResponsibility.findAll({
            where: {role },
            attributes: ['responsibility']  , 
            raw: true
          
        });


        if (roles.length === 0) {
            return res.status(404).json({ message: 'No roles found for this responsibility' });
        }

        // Extract roles from the result
        const roleNames = roles.map(r => r.responsibility);

        res.status(200).json({ responsibility: roleNames });

    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};









export const getAllStates = async (req, res) => {
  try {
    const states = await States.findAll();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ error: "Error fetching states", details: error.message });
  }
};

export const getAllBank = async (req, res) => {
  try {
   
    const Bankdata = await Bank.findAll();

    res.status(200).json(Bankdata);
  } catch (error) {
    res.status(500).json({ error: "Error fetching states", details: error.message });
  }
};


export const getpredifine_remark = async (req, res) => {
  try {
    
    const  remarkData = await predifine_remark.findAll();

    res.status(200).json(remarkData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching states", details: error.message });
  }
};


export const DocumentUploads = async (req, res) => {
  try {
    if (req.file) {
      // Generate the file path
      const filePath = path.join('/uploads', req.file.filename); // Relative path for client
      
      // Send a successful response with the file path
      res.json({
        success: true,
        message: 'File uploaded successfully!',
        path: filePath,
      });
    } else {
      // No file provided in the request
      res.status(400).json({
        success: false,
        message: 'No file uploaded!',
      });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error('Error during file upload:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while uploading the file.',
      error: error.message,
    });
  }
};