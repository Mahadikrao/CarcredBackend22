// src/controllers/userProfileController.js
import { createConnection } from '../utils/db.js';

// Function to create a user profile
import UserProfile from '../models/UserProfile.js';  // Import the model
import User from '../models/User.js';
import cloudinary from '../services/Cloudinary.js';


export const createUserProfile = async (req, res) => {

    
    const { customer_name, address, phone_number, father_name, email, Aadhar, Pan } = req.body;


    // Ensure the profile image is handled correctly
    const profile_image = req.file ? req.file.buffer : null;  // Image as binary data

    // Check if required fields are provided
    // if (!customer_name || !address || !phone_number || !father_name || !profile_image) {
    //   return res.status(400).json({ message: 'All fields including profile image are required' });
    // }

    try {
        // Retrieve authenticated user's ID from the request (assuming `req.user.id` is set)
        const userId = req.user.id;

        // Create a new user profile record in the database
        const newUserProfile = await UserProfile.create({
            user_id: userId,  // Link the profile to the authenticated user
            address,
            phone_number,
            father_name,
            customer_name,
            profile_image,  // Store the profile image as binary data (BLOB)
            email,
            Aadhar,
            Pan,
        });

        // Return success response
        res.status(201).json({
            message: 'User profile created successfully',
            userId,  // Return the user ID for verification
            profile: newUserProfile  // Optionally, you can return the created profile details
        });
    } catch (error) {
        // Handle error case and provide meaningful message
        console.error('Error inserting user profile:', error);
        res.status(500).json({
            message: 'Failed to create user profile',
            error: error // Send detailed error message
        });
    }
};












// export const getuserInfo = async (req, res) => {
//     const db = await createConnection()

//     const query = 'SELECT  * FROM usersprofile WHERE id = ?';
//     const userId = req.user.id;
//     try {
//         const [results] = await db.query(query, [userId]);


//         if (results.length === 0 || !results[0].profile_image) {
//             return res.status(404).json({ message: 'Image not found for this user' });
//         }

//         const base64Image = results[0].profile_image.toString('base64');

//         // Send the image in JSON format
//         res.json({
//             message: 'Image retrieved successfully',
//             image: base64Image,
//             address :results[0].address,
//             phone_number : results[0].phone_number, 
//             father_name : results[0].father_name, 
//             format: 'image/jpeg', // Specify the format based on your stored image
//         });

//     } catch (error) {

//     console.error('Database query error:', err);
//     return res.status(500).json({ message: 'Internal server error' });

//     }
// }



export const getuserInfo = async (req, res) => {
    try {
        // Step 1: Fetch all user profiles from the database
        const userId = req.user.id;
        const userProfiles = await UserProfile.findAll(
            {
                where: { user_id: userId },
            }
        ); // Fetch all profiles from the database

        // Step 2: Handle cases where no user profiles are found
        if (userProfiles.length === 0) {
            return res.status(404).json({ message: 'No user profiles found' });
        }



        // Step 3: Map through each user profile to convert their profile image to base64
        const profilesWithImages = userProfiles.map(profile => {
            const base64Image = profile.profile_image ? profile.profile_image.toString('base64') : null;

            return {
                id: profile.id,
                address: profile.address,
                phone_number: profile.phone_number,
                father_name: profile.father_name,
                customer_name: profile.customer_name,
                email: profile.email,
                Aadhar: profile.Aadhar,
                Pan: profile.Pan,
                image: base64Image,
                format: 'image/jpeg', // Assuming the image is JPEG
            };
        });

        // Step 4: Send the response with the list of user profiles and their images
        return res.json({
            message: 'User profiles retrieved successfully',
            profiles: profilesWithImages, // Array of profiles with base64 images
        });

    } catch (error) {
        // Step 5: Error handling in case of any issues during the database query
        console.error('Error fetching user profiles:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



export const getloginUserDetils = async (req, res) => {
    try {
        const userId = req.user.id;
        const userdetails = await User.findAll(
            {
                where: { id: userId },
                attributes: { exclude: ['password']}
            }
        );

        if (userdetails.length === 0) {
            return res.status(404).json({ message: 'No user profiles found' });
        }


        return res.json({
            message: 'User profiles retrieved successfully',
            profiles: userdetails, // Array of profiles with base64 images
        });




    } catch (error) {

        console.error('Error fetching user profiles:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }

}