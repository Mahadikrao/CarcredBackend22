// import { Sequelize } from 'sequelize';
//  export const sequelizedbconnection = new Sequelize('test', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false,  // Optional: Disable SQL logging (set to `console.log` to enable)
//   });


  // src/utils/db.js
import { Sequelize } from 'sequelize';

export const sequelizedbconnection = () => {
  return new Sequelize('carcred_demo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      freezeTableName: true // ✅ Prevents Sequelize from pluralizing table names
    }, 
    logging: false, // Optional: Disable SQL logging
  });
};


const bankDataSamples = [
  {
    bankName: "Bank A",
    text: `
    Loan Amount: Rs. 1500000/- (Fifteen Lakh Only)
    Customer Name: Mr. John Doe
    Branch: Main Branch, City ABC`
  },
  {
    bankName: "Bank B",
    text: `
    Your Term Loan Sanctioned for Rs. 2000000/- (Two Million)
    Applicant: Jane Smith
    Branch: Downtown Branch`
  },
  {
    bankName: "Bank C",
    text: `
    Loan Amount: Rs. 5000000
    Borrower: Samuel Clark
    Branch: XYZ Branch`
  }
];

// Generic function to extract loan details
function extractLoanDetails(text) {
  // Loan amount extraction patterns
  const loanPatterns = [
    /Loan Amount[:\s]*Rs?\s?([\d,]+)/,
    /Term Loan Sanctioned for Rs?\s?([\d,]+)/,
    /Loan Amount[:\s]*([\d,]+)/,
  ];

  // Customer name extraction patterns
  const customerPatterns = [
    /Customer Name[:\s]*(\w+\s\w+)/,
    /Applicant[:\s]*(\w+\s\w+)/,
    /Borrower[:\s]*(\w+\s\w+)/,
  ];

  // Branch name extraction patterns
  const branchPatterns = [
    /Branch[:\s]*(.*)/,
  ];
  

  let loanAmount = '';
  let customerName = '';
  let branchName = '';

  // Extract loan amount using regex patterns
  for (let pattern of loanPatterns) {
    const match = text.match(pattern);
    if (match) {
      loanAmount = match[1].replace(/[^\d]/g, ''); // Clean amount
      break;
    }
  }

  // Extract customer name using regex patterns
  for (let pattern of customerPatterns) {
    const match = text.match(pattern);
    if (match) {
      customerName = match[1];
      break;
    }
  }

  // Extract branch name using regex patterns
  for (let pattern of branchPatterns) {
    const match = text.match(pattern);
    if (match) {
      branchName = match[1];
      break;
    }
  }

  return {
    loanAmount,
    customerName,
    branchName
  };
}

// Process each bank's data
bankDataSamples.forEach((sample) => {
  const details = extractLoanDetails(sample.text);
  console.log(`Bank: ${sample.bankName}`);
  console.log(`Loan Amount: ${details.loanAmount}`);
  console.log(`Customer Name: ${details.customerName}`);
  console.log(`Branch: ${details.branchName}`);
  console.log('---');
});
