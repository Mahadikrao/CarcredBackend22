import Tesseract from 'tesseract.js';
import PDFParser from "pdf2json";
import fs from "fs";

import {Jimp} from 'jimp';




// async function preprocessImage(buffer) {
//   try {
//       const image = await Jimp.read(buffer);
//       const  data =  await image.greyscale().contrast(1).normalize();
//         console.log(data)
//       const mimeType = image.mime;

//       return await image.getBuffer(mimeType);

    
//   } catch (error) {
//       console.error("Image processing error:", error);
//       throw new Error("Failed to preprocess image");
//   }
// }






function extractDetails(text) {


  // Matches: "Branch: Devendra Nagar", "Branch Name Raipur Asset Center", "BO: Raipur Anupam Nagar/GROUND FLOOR", "0: Dhamtari/NEAR BUS STAND, RAIPUR ROAD, DHAMTARI"
  

  const loanAmountRegex = /Rs\.\s*([\d,]+(?:\.\d{1,2})?)/;
  // const loanAmountRegex = /Approved Loan Amount\s([\d,]+)/; 
  const customerNameRegex = /Purchaser\s*[:\-]?\s*([A-Za-z\s\.]+)/; // Updated to handle Mrs. Aakanksha Gupta
  const dateRegex = /(\d{2}\.\d{2}\.\d{4})/;
  const branchNameRegex = /Branch\s*[:\-]?\s*([A-Za-z\s]+(?:, [A-Za-z\s]+)+)/;

    // Extract values using regex
    const loanAmountMatch = text.match(loanAmountRegex);
    const customerNameMatch = text.match(customerNameRegex);
    const dateMatch = text.match(dateRegex);
    const branchNameMatch = text.match(branchNameRegex);

    // Return the extracted information in an object
    return {
        loanAmount: loanAmountMatch ? loanAmountMatch[1] : "Not found",
        customerName: customerNameMatch ? customerNameMatch[1] : "Not found",
        date: dateMatch ? dateMatch[1] : "Not found",
        branchName: branchNameMatch ? branchNameMatch[1] : "Not found"
    };
}






// export const processOCR = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded." });
//   }

//   const filePath = `./uploads/${req.file.originalname}`;
  
//   // Save the file to disk
//   try {
//     fs.writeFileSync(filePath, req.file.buffer);
//   } catch (error) {
//     return res.status(500).json({ error: "Error saving file." });
//   }

//   const pdfParser = new PDFParser();

//   pdfParser.on("pdfParser_dataError", (errData) => {
//     fs.unlinkSync(filePath); // Ensure cleanup on error
//     return res.status(500).json({ error: errData.parserError });
//   });

//   pdfParser.on("pdfParser_dataReady", (pdfData) => {
//       console.log(pdfData)
//     let extractedText = pdfData.Pages.flatMap((page) =>
//       page.Texts.map((textObj) =>
//         decodeURIComponent(textObj.R.map((r) => r.T).join(" "))
//       )
//     ).join(" ");

//     // Cleanup the file
//     fs.unlinkSync(filePath);
//      const details = extractDetails(extractedText.trim())

//     res.json({
//       success: true,
//       text: extractedText.trim(),
//       details, 
//     });
//   });

//   pdfParser.loadPDF(filePath);
// };




export const processOCR =  async(req, res) => {
    console.log("req.file", req.file.mimetype)
  

   const imagePath = req.file ? req.file.buffer : null; 

   if(req.file.mimetype ==="application/pdf"){

    const filePath = `./uploads/${req.file.originalname}`;
  
  // Save the file to disk
  try {
    fs.writeFileSync(filePath, req.file.buffer);
  } catch (error) {
    return res.status(500).json({ error: "Error saving file." });
  }

  const pdfParser = new PDFParser();

  pdfParser.on("pdfParser_dataError", (errData) => {
    fs.unlinkSync(filePath); // Ensure cleanup on error
    return res.status(500).json({ error: errData.parserError });
  });

  pdfParser.on("pdfParser_dataReady", (pdfData) => {
   
    let extractedText = pdfData.Pages.flatMap((page) =>
      page.Texts.map((textObj) =>
        decodeURIComponent(textObj.R.map((r) => r.T).join(" "))
      )
    ).join(" ");

    // Cleanup the file
    fs.unlinkSync(filePath);
     const details = extractDetails(extractedText.trim())

    res.json({
      success: true,
      text: extractedText.trim(),
      details, 
    });
  });

  pdfParser.loadPDF(filePath);

   }else{
    Tesseract.recognize(
      imagePath,  // The uploaded image path
       "eng",  // Language
      {
        logger: (m) => console.log(m),  // Optional: log progress
      }
    )
      .then(({ data: { text } }) => {
        const details = extractDetails(text);
      
        res.json({
          success: true,
          text: text.trim(),  // Return the extracted text
          details 
        });
      })
      .catch((error) => {
        console.error('Error during OCR processing:', error);
        res.status(500).json({
          success: false,
          message: 'An error occurred during OCR processing.',
        });
      });
    }


  };
  