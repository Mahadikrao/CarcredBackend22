// Import the required modules
import express from 'express';
import authRoutes from './src/routes/authRoutes.js'
import customerRoutes from './src/routes/customerRoutes.js'
import { createConnection } from './src/utils/db.js';
import dotenv from 'dotenv'; 
import cors from 'cors'; 
import { sequelizedbconnection } from './src/services/sequelizedbcon.js';
import { generateQuotationPDF2 } from './src/controllers/CustomerController.js';



dotenv.config();

// Create an instance of the 
const app = express();

// Define the port the server will listen to
const PORT = process.env.PORT || 3000;

app.use(cors());

// If you want to restrict CORS to only allow requests from localhost:5173
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));

app.use(express.json());  // This is necessary to parse the body in POST requests

const initApp = async () => {
  try {
    // Create the Sequelize connection and authenticate it
    const sequelize = await sequelizedbconnection();
      

    // Synchronize models with the database (creates tables if they don't exist)
    await sequelize.sync({ force: false });  // Use { force: true } to drop and recreate the tables
 

    console.log('All models were synchronized successfully.');

    // You can now proceed with your application logic (e.g., API routes)
  } catch (error) {
    console.error('Unable to initialize the app:', error);
  }
};


initApp();  // Initialize the app

//databseconnection
createConnection()

app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);



// Create a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);

});


const quotationData = {
  Pip_Name: "quotation_123.pdf",
  Customer_Name: "John Doe",
  Mobile: "9876543210",
  Consultant_Name: "Jane Smith",
  Contact_Number: "1234567890"
};

generateQuotationPDF2()
// generateQuotationPDF2(quotationData);

