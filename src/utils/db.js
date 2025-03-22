// db.js
// import mysql from 'mysql2/promise'; // Use the promise-based version
// import { Sequelize } from 'sequelize';

// // Create a function that returns a MySQL connection
// export async function createConnection() {
//   try {
//     const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root', // MySQL root user
//       password: '', // Replace with your MySQL root password
//       database: 'test' // Replace with your database name
//     });

//     console.log('Connected as id ' + connection.threadId);
//     return connection; // Return the promise-based connection
//   } catch (err) {
//     console.error('Error connecting: ' + err.stack);
//     throw err; // Rethrow the error so it can be caught elsewhere
//   }
// }




import { sequelizedbconnection } from '../services/sequelizedbcon.js';



// Function to create and authenticate the Sequelize connection
export  const createConnection = async () => {
  const sequelize = sequelizedbconnection();


  try {
    await sequelize.authenticate();
    
    console.log('Connection has been established successfully.');
    return sequelize; // Return the sequelize instance if connection is successful
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Rethrow the error to handle it outside if needed
  }
};



