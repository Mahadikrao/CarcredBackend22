
import PDFDocumentWithTables from 'pdfkit-table';
import fs from "fs";
import axios from "axios";
import path from "path";
import Enquiry from "../models/Enquiry.js";
import Quotation from "../models/Quotation.js";
import car_detail from '../models/Car_verient.js';


import Branch from '../models/branch.js';
import DealerDetails from '../models/dealer_details.js';
import UserWorkLocation from '../models/UserworkLocation.js';

import { sequelizedbconnection } from "../services/sequelizedbcon.js";
import { users_aadhaar } from '../utils/DemoAadhardata.js';
import VinDetails from '../models/Vindetails.js';

const sequelize = sequelizedbconnection();



const cars = [
  { color: "ELECTRIC BLUE", image: "https://demo.carcred.co.in/assets/image/KIGER.png" },
  { color: "ICE COOL WHITE + MYSTERY BLACK ROOF", image: "https://demo.carcred.co.in/assets/image/KIGER.png" },
  { color: "ELECTRIC BLUE", image: "https://demo.carcred.co.in/assets/image/KIGER.png" },
  { color: "ICE COOL WHITE + MYSTERY BLACK ROOF", image: "https://demo.carcred.co.in/assets/image/KIGER.png" },
  { color: "ELECTRIC BLUE", image: "https://demo.carcred.co.in/assets/image/KIGER.png" },
  { color: "ICE COOL WHITE + MYSTERY BLACK ROOF", image: "https://demo.carcred.co.in/assets/image/KIGER.png" },
  { color: "ELECTRIC BLUE", image: "https://demo.carcred.co.in/assets/image/KIGER.png" },
  { color: "ICE COOL WHITE + MYSTERY BLACK ROOF", image: "https://demo.carcred.co.in/assets/image/KIGER.png" },

];







const downloadImage = async (url, filename) => {
  const response = await axios({
    url,
    responseType: "arraybuffer"
  });
  fs.writeFileSync(filename, response.data);
  return filename;
};




export async function generateUniqueEnquiryId() {

  const lastQuotation = await Enquiry.findOne({
    attributes: ["enquiry_id"],
    order: [["enquiry_id", "DESC"]],
  });


  let nextNumber = 1; // Default if no records exist

  if (lastQuotation && lastQuotation.enquiry_id) {



    const lastNumber = parseInt(lastQuotation.enquiry_id.replace("ENQMCPL", ""), 10);


    nextNumber = lastNumber + 1;
  }

  // Format the new ID as EMCPL00000001
  const newEnquiryId = `ENQMCPL${nextNumber.toString().padStart(8, "0")}`;
  return newEnquiryId;
}


const safeNumber = (value, defaultValue = 0) => {
  return isNaN(Number(value)) ? defaultValue : Number(value);


};


const data = {
  deal_name: "MAHADEVA CARS PVT LTD",
  addressbranch: "RAIPURA, RING ROAD NO.01 RAIPUR",
  contact_number: "6262034040",
  contact_number_alt: "9876543210",
  gst_number: "22AAHCM8217F1ZO",
  emailbranch: "info@mahadevacars.com",
  website: "www.mahadevacars.com",
  logo: "logo.png", // Path to logo image
};


const table = {
  headers: [
    { label: "Varient", property: "varient", width: 100, align: "left" },
    { label: "EX-SHOWROOM", property: "ex_showroom_price", width: 90, align: "center" },
    { label: "TCS", property: "tcs", width: 50, align: "center" },
    { label: "REGISTRATION", property: "registration_price", width: 80, align: "center" },
    { label: "INSURANCE", property: "insurance", width: 80, align: "center" },
    { label: "BASIC KIT", property: "essential_kit", width: 60, align: "center" },
    { label: "VAS", property: "vas", width: 60, align: "center" },
    { label: "EWT", property: "ewt", width: 60, align: "center" },
    { label: "HANDLING", property: "handling", width: 70, align: "center" },
    { label: "FAST Tag", property: "fast_tag", width: 60, align: "center" },
    { label: "On Road Price", property: "on_road_price", width: 92, align: "right" },
  ],
  datas: [
    { variant: "RXE MT 6.2 2024", ex_showroom: "480100", tcs: "0", registration: "50809", insurance: "31025", basic_kit: "3090", vas: "10000", ewt: "5852", handling: "10000", fast_tag: "0", on_road_price: "590876" },
    { variant: "RXL MT 6.2 (2024)", ex_showroom: "485600", tcs: "0", registration: "56160", insurance: "31257", basic_kit: "3090", vas: "10000", ewt: "5852", handling: "10000", fast_tag: "0", on_road_price: "601959" },
    { variant: "RXL (O) MT 6.2 (2024)", ex_showroom: "510100", tcs: "0", registration: "58610", insurance: "32306", basic_kit: "3090", vas: "10000", ewt: "5852", handling: "10000", fast_tag: "0", on_road_price: "629958" },
    { variant: "RXL (O) MT 6.2 LE", ex_showroom: "510100", tcs: "0", registration: "58610", insurance: "32810", basic_kit: "3090", vas: "10000", ewt: "5852", handling: "10000", fast_tag: "800", on_road_price: "631262" },
    { variant: "RXT MT 6.2 (2024)", ex_showroom: "560978", tcs: "0", registration: "63698", insurance: "34485", basic_kit: "3090", vas: "10000", ewt: "6398", handling: "10000", fast_tag: "0", on_road_price: "688649" },
    { variant: "RXT CLIMBER 6.2 (2024)", ex_showroom: "598478", tcs: "0", registration: "67448", insurance: "35651", basic_kit: "3090", vas: "10000", ewt: "6398", handling: "10000", fast_tag: "0", on_road_price: "731065" },
    { variant: "RXT CLIMBER DT 6.2 (2024)", ex_showroom: "610478", tcs: "0", registration: "68648", insurance: "36165", basic_kit: "3090", vas: "10000", ewt: "6398", handling: "10000", fast_tag: "0", on_road_price: "744779" }
  ]
};






export async function generateQuotationPDF(Data) {

  const tempDir = "temp";
  fs.mkdirSync(tempDir, { recursive: true });


  const outputPath = path.join("outputs", Data.Pip_Name);

  // Ensure output folder exists
  if (!fs.existsSync("outputs")) {
    fs.mkdirSync("outputs", { recursive: true });
  }

  const doc = new PDFDocumentWithTables({ size: "A4", layout: "landscape", margin: 20 });

  // Save the file
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  try {
    // Header - Company Info
    // Header Section

    // border in page
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const borderMargin = 20;

    doc.rect(borderMargin, borderMargin, pageWidth - 2 * borderMargin, pageHeight - 2 * borderMargin)
      .lineWidth(1) // Border thickness
      .strokeColor("black") // Border color
      .stroke();

    doc.y = 20;




    doc.moveDown(0.5);
    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text(data.deal_name, { align: "center" })
      .moveDown(0.2);




    doc
      .fontSize(10)
      .fillColor("#525050")
      .text(data.addressbranch, { align: "center", lineGap: 3, });

    doc
      .text(
        `${data.contact_number}, ${data.contact_number_alt}, GSTN: ${data.gst_number}`,
        { align: "center", lineGap: 3, }
      )
      .text(`Email: ${data.emailbranch} | Website: ${data.website}`, {
        align: "center",
        lineGap: 3,
      })
      .moveDown(0.1);

    // 🔹 Add Another Static Line


    // Add logo (top-right corner)
    // if (data.logo) {
    //   doc.image(data.logo, doc.page.width - 60, 20, { width: 40 });
    // }

    // Draw a border around the header
    doc
      .rect(20, 20, doc.page.width - 40, 80) // Increased height for extra text
      .lineWidth(1)
      .strokeColor("black")
      .stroke();

    doc.moveDown(0.5);

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Product Information Page", { align: "center" })

    doc.moveDown(0.1);


    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();

    doc.moveDown(0.5);



    // Customer and Consultant Details
    const customerDetailsY = doc.y;
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Customer Details:", 25, customerDetailsY)
      .moveDown(0.3)
      .font("Helvetica")
      .text(`Customer Name:               ${Data.Customer_Name}`, 25)

      .moveDown(0.2)
      .text("Address:                Raipur, CHHATTISGARH", 25,)
      .moveDown(0.2)
      .text("Email:                    Carcred7667@gmail.com", 25)
      .moveDown(0.2)
      .text(`Mobile:               ${Data.Mobile}`, 25)
    doc.moveDown(0.2)

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Date: 12-03-2025", 700, customerDetailsY)
      .moveDown(0.3)
      .font("Helvetica")
      .text(`Consultant Name:               ${Data.Consultant_Name}`, 600)
      .moveDown(0.2)
      .text(`Contact Number:               ${Data.Contact_Number}`, 600)

    doc.moveDown(3);

    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();

    doc.moveDown(0.5);

    doc
      .fontSize(14)
      .text(" ", { align: "center" })
    doc.moveDown(0.5);

    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();

    // Draw Table Header (Gray Background)
    doc.rect(20, doc.y, doc.page.width - 40, 20).fill("#D3D3D3").stroke();

    doc.fillColor("black").text("Your Color Options", 35, doc.y + 5);

    doc.moveDown(0.3);

    // Define Car Colors and Images

    let x = 26,
      y = doc.y,
      imgWidth = 169,
      imgHeight = 100,
      colGap = 1,
      rowGap = 1,
      columns = 4,
      cellWidth = imgWidth + 30,
      cellHeight = imgHeight + 35; // Extra space for text

    // Loop through the cars array
    for (let i = 0; i < cars.length; i++) {
      // Move to the next row when reaching the column limit
      if (i % columns === 0 && i !== 0) {
        x = 26; // Reset x position
        y += cellHeight + rowGap; // Move to next row
      }

      const localImagePath = path.join("temp", `car_${i}.png`);


      // Draw table cell (Border around each item)
      doc
        .rect(x - 5, y - 5, cellWidth, cellHeight) // Border around image + text
        .lineWidth(1)
        .strokeColor("black")
        .stroke();

      // Draw image inside the cell
      doc.image(localImagePath, x, y, { width: imgWidth, height: imgHeight });

      // Draw text below image (Car color)
      doc
        .fontSize(8)
        .text(cars[i].color, x, y + imgHeight + 5, { width: imgWidth, align: "center" });

      // Move x to next column
      x += cellWidth + colGap;
    }

    // Move cursor down after the table
    doc.moveDown(2);



    doc.addPage(); //next page

    doc.rect(borderMargin, borderMargin, pageWidth - 2 * borderMargin, pageHeight - 2 * borderMargin)
      .lineWidth(1) // Border thickness
      .strokeColor("black") // Border color
      .stroke();

    doc.y = 20;




    doc.moveDown(0.5);
    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text(data.deal_name, { align: "center" })
      .moveDown(0.2);




    doc
      .fontSize(10)
      .fillColor("#525050")
      .text(data.addressbranch, { align: "center", lineGap: 3, });

    doc
      .text(
        `${data.contact_number}, ${data.contact_number_alt}, GSTN: ${data.gst_number}`,
        { align: "center", lineGap: 3, }
      )
      .text(`Email: ${data.emailbranch} | Website: ${data.website}`, {
        align: "center",
        lineGap: 3,
      })
      .moveDown(0.1);

    // 🔹 Add Another Static Line


    // Add logo (top-right corner)
    // if (data.logo) {
    //   doc.image(data.logo, doc.page.width - 60, 20, { width: 40 });
    // }

    // Draw a border around the header
    doc
      .rect(20, 20, doc.page.width - 40, 80) // Increased height for extra text
      .lineWidth(1)
      .strokeColor("black")
      .stroke();

    doc.moveDown(0.5);

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Product Information Page", { align: "center" })

    doc.moveDown(0.1);
    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();




    await doc.table(table, {
      x: 20,
      y: doc.y + 5,
      width: 540,
      padding: [10, 10, 5, 10], // Padding inside cells
      columnSpacing: 5, // Space between columns
      divider: {
        header: { width: 1, opacity: 1 }, // Border for header
        horizontal: { width: 1, opacity: 1 } // Borders for rows
      }
    });

    doc.moveDown(1);
    doc.font('Helvetica-Bold').fontSize(10).text("Terms & Conditions :", { underline: true, indent: 2 })
      .moveDown(0.1);
    doc.font('Helvetica').fontSize(8);
    doc.text("1) Price and statutory levies at the time of delivery are as applicable Irrespective of when the initial payment is made.", { indent: 2 })
      .moveDown(0.1);
    doc.text("2) Vehicle will be delivered only after realization of full and final payment.", { indent: 2 })
      .moveDown(0.1);
    doc.text("3) All the matters/issues (if any) shall be subjected to the exclusive jurisdiction of the competent courts in the State of the Dealer with whom the booking is made.", { indent: 2 })
      .moveDown(0.1);
    doc.text("4) Ex-showroom / insurance price may vary due to any offer from Dealer/Market condition’s from time to time.", { indent: 2 })
      .moveDown(0.1)
    doc.text("5) TCS @ 1% applicable if Ex-Showroom Price is above INR 10 lac.", { indent: 2 })
      .moveDown(0.1);
    doc.text("6) Price effective for the Current Month only.", { indent: 2 });



    doc.end();


    stream.on('finish', () => {

      console.log(`✅ PDF saved successfully at: ${outputPath}`);

    });

  } catch (error) {
    console.error("❌ Error generating PDF:", error);

  }
}









export const createEnquiry = async (req, res) => {
  try {



    const uniqueId = await generateUniqueEnquiryId()
    const {
      title,
      first_name,
      last_name,
      mobile,
      email,
      address,
      city,
      state,
      enquiry_date,
      source,
      remark,
      reminder_date,
      model_code,
      variant_name,
      dealer_id,
      branch_id,
      date,
      cardetail_id,
      model_id,
      color_id,
      color,
      interior_color_id,
      ex_showroom_price,
      registration_charge,
      insurance,
      insurance_add,
      tcs,
      essential_kit,
      handling,
      add_on_policy,
      fast_tag,
      on_road_price,
      accesories,
      vas,
      extended_warranty,
      amc,
      installation_charge,
      other_charge,
      charge_reason,
      temporey_registration,
      number_plate,
      cash_scheme,
      vin_discount,
      vehicle_exchange_amt,
      final_on_road_price,
      temporary_registration,
      color_name,

    } = req.body;
    const data = req.body.CarAmounts;
    const data2 = req.body;


    if (!first_name || !last_name || !mobile) {
      return res
        .status(400)
        .json({
          message: "Title, First Name, Last Name, and Mobile Number are required.",
        });
    }

    // Create Enquiry
    const enquiry = await Enquiry.create({
      ...data,
      title,
      first_name,
      last_name,
      mobile,
      email,
      address,
      city,
      state,
      branch_id: req.user?.branch_id,


      source,
      remark,
      reminder_date,
      model_code,
      model_id,
      variant_name,
      enquiry_date,
      enquiry_id: uniqueId,
      created_by: req.user.id,
    });

    // Create Quotation Linked to Enquiry
    const quotation = await Quotation.create({
      dealer_id,
      branch_id,
      date: enquiry_date,
      cardetail_id,
      model_id,
      color_id,
      color,
      interior_color_id,
      enquiry_id: enquiry.enquiry_id, // Linking to the created enquiry
      ex_showroom_price,
      registration_charge,
      insurance,
      insurance_add,
      tcs,
      essential_kit,
      handling,
      add_on_policy,
      fast_tag,
      on_road_price,
      accesories,
      vas,
      extended_warranty,
      amc,
      installation_charge,
      other_charge,
      charge_reason,
      temporey_registration: temporary_registration,
      final_on_road_price: on_road_price,
      number_plate,
      cash_scheme,
      vin_discount,
      vehicle_exchange_amt,
      final_on_road_price,
      created_by: req.user.id,
      cardetail_id: data?.detail_id,
      color: color_name,

    });


    res.status(201).json({
      message: "Enquiry and Quotation created successfully",
      enquiry,
      quotation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log({ error: error.message })
  }
};



















// export const getEnquiry = async (req, res) => {
//   try {

//     const query = `
//     SELECT * FROM enquiry1 
//     LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
//     WHERE enquiry1.created_by = 'USER000003' OR raw_quotation.created_by = 'USER000003'

//     UNION

//     SELECT * FROM enquiry1 
//     RIGHT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
//     WHERE enquiry1.created_by = 'USER000003' OR raw_quotation.created_by = 'USER000003';
// `;



//     const userId = req.user.id;

//     const limit = parseInt(req.query.limit) || 10;
//     const page = parseInt(req.query.page) || 1;
//     const offset = (page - 1) * limit;

//     // Get count of Enquiry and Quotation separately
//     const enquiryData = await Enquiry.findAndCountAll({
//       where: { created_by: userId },
//       limit,
//       offset,
//     });

//     const quotationData = await Quotation.findAndCountAll({
//       where: { created_by: userId },
//       limit,
//       offset,
//     });

//     // Merging data
//     const enquiries = [...enquiryData.rows, ...quotationData.rows];

//     // Total count from both tables
//     const totalEnquiries = enquiryData.count + quotationData.count;
//     const totalPages = Math.ceil(totalEnquiries / limit);

//     res.status(200).json({
//       totalEnquiries,
//       totalPages,
//       currentPage: page,
//       enquiries,
//     });
//   } catch (error) {
//     console.error("Error fetching enquiries:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



















// export const getEnquiry = async (req, res) => {
//   try {
//     const userId = req.user.id; // Get logged-in user ID dynamically
//     const limit = parseInt(req.query.limit) || 1;
//     const page = parseInt(req.query.page) || 1;
//     const offset = (page - 1) * limit;

//     // Raw SQL query with dynamic userId
//     // const query = `
//     //   SELECT * FROM enquiry1 
//     //   LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
//     //   LEFT JOIN car_detail ON raw_quotation.cardetail_id = car_detail.detail_id
//     //   LEFT JOIN car_model ON   raw_quotation.model_id = car_model.model_id
//     //   WHERE enquiry1.created_by = :userId OR raw_quotation.created_by = :userId

//     //   AND ( enquiry1.first_name LIKE "om" OR enquiry1.mobile LIKE " ")
//     //   ORDER BY enquiry_date DESC 
//     //   LIMIT :limit OFFSET :offset;
//     // `;

//      const query = ` SELECT * FROM enquiry1 
//       LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
//       LEFT JOIN car_detail ON raw_quotation.cardetail_id = car_detail.detail_id
//       LEFT JOIN car_model ON raw_quotation.model_id = car_model.model_id
//       WHERE (enquiry1.created_by = "USER000003" OR raw_quotation.created_by = "USER000003")
//       AND ( enquiry1.first_name LIKE " " OR enquiry1.mobile LIKE " ")

//       ORDER BY enquiry_date DESC 

//       LIMIT :limit OFFSET :offset;
//      `

//     // Execute raw query using Sequelize
//     const enquiries = await sequelize.query(query, {
//       replacements: { userId, limit, offset },
//       type: sequelize.QueryTypes.SELECT,
//     });

//     // Count total records (without LIMIT & OFFSET)
//     const countQuery = `
//       SELECT COUNT(*) as total FROM (
//         SELECT enquiry1.enquiry_id FROM enquiry1 
//         LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
//         WHERE enquiry1.created_by = :userId OR raw_quotation.created_by = :userId
//         UNION
//         SELECT enquiry1.enquiry_id FROM enquiry1 
//         RIGHT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
//         WHERE enquiry1.created_by = :userId OR raw_quotation.created_by = :userId
//       ) AS combinedData;
//     `;

//     const totalCountResult = await sequelize.query(countQuery, {
//       replacements: { userId },
//       type: sequelize.QueryTypes.SELECT,
//     });

//     const totalEnquiries = totalCountResult[0]?.total || 0;
//     const totalPages = Math.ceil(totalEnquiries / limit);

//     res.status(200).json({
//       totalEnquiries,
//       totalPages,
//       currentPage: page,
//       enquiries,
//     });
//   } catch (error) {
//     console.error("Error fetching enquiries:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// export const getEnquiry = async (req, res) => {
//   try {
//     const userId = req.user.id; // Get logged-in user ID dynamically
//     const limit = parseInt(req.query.limit) || 1;
//     const page = parseInt(req.query.page) || 1;
//     const offset = (page - 1) * limit;

//     const { firstName, mobile, startDate , endDate, enquiry_status} = req.query; // Get query params for first_name and mobile

//     // Dynamically build the WHERE condition for first_name and mobile
//     let searchCondition = '';

//     let DateFilter = '';

//     if (firstName) {
//       searchCondition = `AND (enquiry1.first_name LIKE :firstName)`;
//     }



//      if(mobile){

//       searchCondition = `AND (enquiry1.mobile LIKE :mobile)`;
//     }


//     if(startDate && endDate ){

//     DateFilter = `AND enquiry1.enquiry_date BETWEEN :startDate AND :endDate`

//     }

//      let Status = ""

//     if(enquiry_status){
//       Status = `WHERE enquiry_status : enquiry_status`

//     }




//     // Raw SQL query with dynamic userId and dynamic search conditions
//     const query = `
//       SELECT * FROM enquiry1 
//       LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
//       LEFT JOIN car_detail ON raw_quotation.cardetail_id = car_detail.detail_id
//       LEFT JOIN car_model ON raw_quotation.model_id = car_model.model_id
//       WHERE (enquiry1.created_by = :userId OR raw_quotation.created_by = :userId)
//       ${searchCondition}
//       ${DateFilter}
//        ${Status}
//       ORDER BY enquiry_date DESC
//       LIMIT :limit OFFSET :offset;
//     `;

//     // Execute raw query using Sequelize
//     const enquiries = await sequelize.query(query, {
//       replacements: {
//         userId,
//         firstName: `%${firstName || ''}%`, // Default to empty string if not provided
//         mobile: `%${mobile || ''}%`,       // Default to empty string if not provided
//         startDate: startDate || null,      // Ensure null if not provided
//         endDate: endDate || null,   
//         enquiry_status: enquiry_status || null,        // Ensure null if not provided
//         limit,
//         offset
//       },
//       type: sequelize.QueryTypes.SELECT,
//     });

//     // Count total records (without LIMIT & OFFSET)
//     const countQuery = `
//       SELECT COUNT(*) as total FROM enquiry1
//       LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
//       WHERE enquiry1.created_by = :userId OR raw_quotation.created_by = :userId;
//     `;

//     const totalCountResult = await sequelize.query(countQuery, {
//       replacements: { userId },
//       type: sequelize.QueryTypes.SELECT,
//     });

//     const totalEnquiries = totalCountResult[0]?.total || 0;
//     const totalPages = Math.ceil(totalEnquiries / limit);

//     res.status(200).json({
//       totalEnquiries,
//       totalPages,
//       currentPage: page,
//       enquiries,
//     });
//   } catch (error) {
//     console.error("Error fetching enquiries:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// export const getEnquiry = async (req, res) => {
//   try {
//     const userId = req.user.id; // Get logged-in user ID dynamically
//     const limit = parseInt(req.query.limit) || 10;
//     const page = parseInt(req.query.page) || 1;
//     const offset = (page - 1) * limit;

//     const { Search, startDate, endDate, enquiry_status } = req.query;

//     let searchCondition = '';  // Condition for firstName and mobile
//     let DateFilter = '';       // Condition for date range
//     let statusCondition = '';  // Condition for enquiry status

//     // Handle firstName filter
//     if (Search) {
//       searchCondition += `AND enquiry1.first_name LIKE :firstName OR  enquiry1.mobile LIKE :mobile `;
//     }



//     // Handle date range filter
//     if (startDate && endDate) {
//       DateFilter = `AND enquiry1.enquiry_date BETWEEN :startDate AND :endDate `;
//     }

//     // Handle enquiry status filter
//     if (enquiry_status) {
//       statusCondition = `AND enquiry1.enquiry_status = :enquiry_status `;
//     }

//     // Raw SQL query with dynamic userId and dynamic search conditions
//     const query = `
//       SELECT * FROM enquiry1 
//       LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
//       LEFT JOIN car_detail ON raw_quotation.cardetail_id = car_detail.detail_id
//       LEFT JOIN car_model ON raw_quotation.model_id = car_model.model_id
//       WHERE (enquiry1.created_by = :userId OR raw_quotation.created_by = :userId)
//       ${searchCondition} 
//       ${DateFilter} 
//       ${statusCondition}
//       ORDER BY enquiry_date DESC
//       LIMIT :limit OFFSET :offset;
//     `;

//     // Execute raw query using Sequelize
//     const enquiries = await sequelize.query(query, {
//       replacements: {
//         userId,
//         Search: `%${Search || ''}%`,  // Default to empty string if not provided

//         startDate: startDate || null,       // Ensure null if not provided
//         endDate: endDate || null,           // Ensure null if not provided
//         enquiry_status: enquiry_status || null, // Ensure null if not provided
//         limit,
//         offset
//       },
//       type: sequelize.QueryTypes.SELECT,
//     });

//     // Count total records (without LIMIT & OFFSET)
//     const countQuery = `
//       SELECT COUNT(*) as total FROM enquiry1
//       LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
//       WHERE enquiry1.created_by = :userId OR raw_quotation.created_by = :userId;
//     `;

//     const totalCountResult = await sequelize.query(countQuery, {
//       replacements: { userId },
//       type: sequelize.QueryTypes.SELECT,
//     });

//     const totalEnquiries = totalCountResult[0]?.total || 0;
//     const totalPages = Math.ceil(totalEnquiries / limit);

//     res.status(200).json({
//       totalEnquiries,
//       totalPages,
//       currentPage: page,
//       enquiries,
//     });
//   } catch (error) {
//     console.error("Error fetching enquiries:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


export const getEnquiry = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID dynamically
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { Search, startDate, endDate, enquiry_status } = req.query;

    // enquiry_status?.join(',').split(',')


    console.log("req.query --------------------------------------------------------------------", req.query)

    let searchCondition = '';  // Condition for firstName and mobile
    let DateFilter = '';       // Condition for date range
    let statusCondition = '';  // Condition for enquiry status

    // Handle Search filter for firstName and mobile
    if (Search) {
      searchCondition = `AND (enquiry1.first_name LIKE :Search OR enquiry1.mobile LIKE :Search)`;
    }

    // Handle date range filter
    if (startDate && endDate && startDate !== 'null' && endDate !== 'null') {
      DateFilter = `AND enquiry1.enquiry_date BETWEEN :startDate AND :endDate `;
    }

    // Handle enquiry status filter
    if (enquiry_status && Array.isArray(enquiry_status) && enquiry_status.length > 0 && enquiry_status[0] !== '') {
      statusCondition = `AND enquiry1.enquiry_status IN (:enquiry_status)`;
    }

    console.log("enquiry_status", enquiry_status)


    // Raw SQL query with dynamic userId and dynamic search conditions
    const query = `
      SELECT * FROM enquiry1 
      LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
      LEFT JOIN car_detail ON raw_quotation.cardetail_id = car_detail.detail_id
      LEFT JOIN car_model ON raw_quotation.model_id = car_model.model_id
      WHERE (enquiry1.created_by = :userId OR raw_quotation.created_by = :userId)
      ${searchCondition} 
      ${DateFilter} 
      ${statusCondition}
      ORDER BY enquiry_date DESC
      LIMIT :limit OFFSET :offset;
    `;

    console.log("query----------------------------------", query)

    // Execute raw query using Sequelize
    const enquiries = await sequelize.query(query, {
      replacements: {
        userId,
        Search: `%${Search || ''}%`,  // Default to empty string if not provided
        startDate: startDate || null, // Ensure null if not provided
        endDate: endDate || null,     // Ensure null if not provided
        enquiry_status: enquiry_status?.join(',').split(',') || null, // Ensure null if not provided
        limit,
        offset
      },
      type: sequelize.QueryTypes.SELECT,
    });

    // Count total records (without LIMIT & OFFSET) with dynamic conditions
    const countQuery = `
      SELECT COUNT(*) as total FROM enquiry1
      LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
      WHERE (enquiry1.created_by = :userId OR raw_quotation.created_by = :userId)
      ${searchCondition}
      ${DateFilter}
      ${statusCondition};
    `;

    const totalCountResult = await sequelize.query(countQuery, {
      replacements: {
        userId,
        Search: `%${Search || ''}%`,
        startDate: startDate || null,
        endDate: endDate || null,
        enquiry_status: enquiry_status || null
      },
      type: sequelize.QueryTypes.SELECT,
    });

    const totalEnquiries = totalCountResult[0]?.total || 0;
    const totalPages = Math.ceil(totalEnquiries / limit);

    res.status(200).json({
      totalEnquiries,
      totalPages,
      currentPage: page,
      enquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};








export const generatePip = async (req, res) => {
  try {

    console.log("req----", req.body);

    const { model_id, } = req.body; // Extract model_id from request body


    const responseData = await car_detail.findAll({
      where: { model_id: model_id },
    });

    if (!responseData || responseData.length === 0) {
      return res.status(404).json({ message: "No car details found" });
    }

    // If table is an object, initialize it properly

    table.datas = responseData


    const pdfResponse = await generateQuotationPDF(req.body);

    // Send response
    res.status(200).json({
      carDetails: responseData,
      pdfResult: pdfResponse, // Include PDF response if needed
    });
  } catch (error) {
    console.error("Error fetching car details:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;


    // Get today's date
    const today = new Date();
    const todayFormatted = today.toISOString().slice(0, 10); // YYYY-MM-DD format

    // Get the previous month's date
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1); // Go back one month
    const lastMonthFormatted = lastMonth.toISOString().slice(0, 10); // YYYY-MM-DD format



    // Query for enquiries created today (FTD)
    const queryForTodayEnquiries = `
      SELECT * 
      FROM enquiry1 
      WHERE created_by = :userId 
        AND DATE(enquiry_date) = :todayFormatted;
    `;

    // Query for enquiries created between today and last month (FTD)
    const queryForLastMonthEnquiries = `
      SELECT * 
      FROM enquiry1 
      WHERE created_by = :userId 
        AND DATE(enquiry_date) BETWEEN :lastMonthFormatted AND :todayFormatted;
    `;

    // Query for loan details created today (FTD)
    const queryForTodayLoanDetails = `
      SELECT * 
      FROM loan_detail 
      WHERE created_by = :userId 
        AND DATE(date) = :todayFormatted;
    `;

    // Query for loan details created between today and last month (MTD)
    const queryForLastMonthLoanDetails = `
      SELECT * 
      FROM loan_detail 
      WHERE created_by = :userId 
        AND DATE(date) BETWEEN :lastMonthFormatted AND :todayFormatted;
    `;

    // Query for loan details with specific statuses created between today and last month (Processing, Open)
    const queryForProcessingOpenLoansMonths = `
      SELECT * 
      FROM loan_detail 
      WHERE created_by = :userId 
        AND (loan_status IN ('SUBMITTED TO BANK', 'PROCESSING', 'FILE COMPLETE', 
                             'CRM LOGIN ENTRY', 'RISK CONTAINMENT UNIT', 
                             'DATA ENTRY', 'UNDERWRITING', 'CREDIT RUN', 'QUERY'))
        AND DATE(date) BETWEEN :lastMonthFormatted AND :todayFormatted
        AND branch_id IN (
          SELECT location_id 
          FROM user_work_location 
          WHERE user_id = :userId
        );
    `;

    // Query for loan details with specific statuses created today (Processing, Open)
    const queryForProcessingOpenLoanToday = `
      SELECT * 
      FROM loan_detail 
      WHERE created_by = :userId 
        AND (loan_status IN ('SUBMITTED TO BANK', 'PROCESSING', 'FILE COMPLETE', 
                             'CRM LOGIN ENTRY', 'RISK CONTAINMENT UNIT', 
                             'DATA ENTRY', 'UNDERWRITING', 'CREDIT RUN', 'QUERY'))
        AND DATE(date) = :todayFormatted
        AND branch_id IN (
          SELECT location_id 
          FROM user_work_location 
          WHERE user_id = :userId
        );
    `;




    const queryApproveLoanToday = `
   SELECT * 
FROM loan_detail 
WHERE (loan_status = 'APPROVED' 
       OR loan_status = 'VIN ALLOTED' 
       OR loan_status = 'PRE-DISBURSEMENT' 
       OR loan_status = 'DELIVERY ORDER' 
       OR loan_status = 'DISBURSEMENT') 
  AND DATE(date) = :todayFormatted
  AND branch_id IN (
    SELECT location_id 
    FROM user_work_location 
    WHERE user_id = '$userID'
  );

  `


    const queryApproveLoanMonth = `
   SELECT * 
FROM loan_detail 
WHERE (loan_status = 'APPROVED' 
       OR loan_status = 'VIN ALLOTED' 
       OR loan_status = 'PRE-DISBURSEMENT' 
       OR loan_status = 'DELIVERY ORDER' 
       OR loan_status = 'DISBURSEMENT') 
  AND DATE(date) = :todayFormatted
  AND branch_id IN (
    SELECT location_id 
    FROM user_work_location 
    WHERE user_id = '$userID'
  );

  `





    // Execute the query for enquiries created today
    const enquiriesToday = await sequelize.query(queryForTodayEnquiries, {
      replacements: { userId, todayFormatted },
      type: sequelize.QueryTypes.SELECT,
    });

    // Execute the query for enquiries created between today and last month
    const enquiriesLastMonth = await sequelize.query(queryForLastMonthEnquiries, {
      replacements: { userId, lastMonthFormatted, todayFormatted },
      type: sequelize.QueryTypes.SELECT,
    });

    // Execute the query for loan details created today
    const loanDetailsToday = await sequelize.query(queryForTodayLoanDetails, {
      replacements: { userId, todayFormatted },
      type: sequelize.QueryTypes.SELECT,
    });

    // Execute the query for loan details created between today and last month
    const loanDetailsLastMonth = await sequelize.query(queryForLastMonthLoanDetails, {
      replacements: { userId, lastMonthFormatted, todayFormatted },
      type: sequelize.QueryTypes.SELECT,
    });

    // Execute the query for processing/open loans created between today and last month
    const processingOpenLoansMonths = await sequelize.query(queryForProcessingOpenLoansMonths, {
      replacements: { userId, lastMonthFormatted, todayFormatted },
      type: sequelize.QueryTypes.SELECT,
    });

    // Execute the query for processing/open loans created today
    const processingOpenLoansToday = await sequelize.query(queryForProcessingOpenLoanToday, {
      replacements: { userId, todayFormatted },
      type: sequelize.QueryTypes.SELECT,
    });

    // Combine or process the data as required, for example, by sending it as a response
    const ApproveLoanToday = await sequelize.query(queryApproveLoanToday, {
      replacements: { userId, todayFormatted },
      type: sequelize.QueryTypes.SELECT,
    });

    // Execute the query for processing/open loans created today
    const ApproveLoanMonth = await sequelize.query(queryApproveLoanMonth, {

      replacements: { userId, lastMonthFormatted, todayFormatted },
      type: sequelize.QueryTypes.SELECT,
    });






    const data = {
      enquiriesToday: enquiriesToday?.length || 0,
      enquiriesLastMonth: enquiriesLastMonth?.length || 0,
      loanDetailsToday: loanDetailsToday?.length || 0,
      loanDetailsLastMonth: loanDetailsLastMonth?.length || 0,
      processingOpenLoansMonths: processingOpenLoansMonths?.length || 0,
      processingOpenLoansToday: processingOpenLoansToday?.length || 0,
      ApproveLoanToday: ApproveLoanToday?.length || 0,
      ApproveLoanMonth: ApproveLoanMonth?.length || 0,
    };

    res.json(data);

  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
};





export const BranchDetails = async (req, res) => {
  try {
    const userLocation = await UserWorkLocation.findOne({
      where: { user_id: req.user.id },
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

    const BranchdataAll = await DealerDetails.findOne({
      where: { dealer_id: Branchdata.dealer_id },
    });

    if (!BranchdataAll) {
      return res.status(404).json({ message: "Dealer details not found" });
    }

    return res.status(200).json({
      dealerDetails: BranchdataAll,
      userLocation,
      branchData: Branchdata,
    });
  } catch (error) {
    console.error("Error fetching branch details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const AadhharCard = async (req, res) => {
  try {
    const { user_aadhaar_number } = req.body

    const user = users_aadhaar.find((user) => user.result.user_aadhaar_number === user_aadhaar_number.toString());

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Respond with the user's Aadhaar details
    return res.status(200).json({ success: true, data: user });

  } catch (error) {
    console.log("error", error)
  }
}










export async function generateQuotationPDF2(quotationdata) {
  const tempDir = "temp";
  fs.mkdirSync(tempDir, { recursive: true });

//  customer Info .......
 const customerDetails = quotationdata?.enquiry; 



  const outputPath = path.join("outputs",   quotationdata?.Pip_Name|| "Quotation33.pdf");

  if (!fs.existsSync("outputs")) {
    fs.mkdirSync("outputs", { recursive: true });
  }

  const doc = new PDFDocumentWithTables({ size: "A4", margin: 20 });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const priceDetails = [
    { label: "Ex-Showroom Price", value: quotationdata?.ex_showroom_price },

    { label: "Registration Charges", value: quotationdata?.registration_charge },
    ,
    { label: "Motor Insurance", value: "26825" },

    { label: "Add On Cover", value: "4200" },

    { label: "Logistics/Handling Charge", value: "10000" },

    { label: "Essential Kit/Accessories", value: "3090" },

    { label: "Extended Warranty", value: "5852" },
    { label: "AMC", value: "0" },
    { label: "Temporary Registration", value: "0" },
    { label: "Fast Tag", value: "0" },

    { label: "Number Plate", value: "0" },

    { label: "TCS @ 1%", value: "0" },

    { label: "VAS", value: "10000" },

    { label: "Installation Charge", value: "0" },
  ];

  const items = [
    { label: "(+) Other Charge", value: "0" },
    ,
    { label: "(-) Car Exchange Amount", value: "0" },

    { label: "(-) Vin Discount", value: "0" },

    { label: "(-) Cash Discount", value: "0" },
  ];



  try {
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const borderMargin = 20;

    doc.rect(borderMargin, borderMargin, pageWidth - 2 * borderMargin, pageHeight - 2 * borderMargin)
      .lineWidth(1) // Border thickness
      .strokeColor("black") // Border color
      .stroke();

    doc.y = 20;


    doc.moveDown(0.5);
    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(data.deal_name, { align: "center" })
      .moveDown(0.2);




    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(data.addressbranch, { align: "center", lineGap: 3, });

    doc
      .text(
        `${data.contact_number}, ${data.contact_number_alt}, GSTN: ${data.gst_number}`,
        { align: "center", lineGap: 3, }
      )
      .text(`Email: ${data.emailbranch} | Website: ${data.website}`, {
        align: "center",
        lineGap: 3,
      })
      .moveDown(0.1);

    // 🔹 Add Another Static Line


    // Add logo (top-right corner)
    // if (data.logo) {
    //   doc.image(data.logo, doc.page.width - 60, 20, { width: 40 });
    // }

    // Draw a border around the header
    doc
      .rect(20, 20, doc.page.width - 40, 80) // Increased height for extra text
      .lineWidth(1)
      .strokeColor("black")
      .stroke();

    doc.moveDown(0.8);

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Product Information Page", { align: "center" })

    doc.moveDown(0.1);



    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();


    const centerX = pageWidth / 2;

    doc
      .moveTo(centerX, doc.y) // Start point at center of the page
      .lineTo(centerX, doc.y + 420) // Extend the line downward
      .stroke(); // Apply stroke to render the line
    doc.moveDown(1);


    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();




    // Customer and Consultant Details
    const customerDetailsY = doc.y;
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Customer Details:", 25, customerDetailsY - 12)
      .moveDown(0.4)
      .font("Helvetica-BoldOblique")

      .text(`Customer Name : ${customerDetails?.name_prefix} ${customerDetails?.first_name } ${customerDetails?.last_name } `, 25)

      .moveDown(0.2)
      .text(`Address : ${customerDetails?.city} ${customerDetails?.state}`, 25,)
      .moveDown(0.2)
      .text(`Email : ${customerDetails?.email}`, 25)
      .moveDown(0.2)
      .text(`Mobile :  ${customerDetails?.mobile}`, 25)

    doc.moveDown(0.2)

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Bank Details :", 300, customerDetailsY - 12)
      .moveDown(0.4)
      .font("Helvetica-BoldOblique")
      .text(`Account Name : MAHADEVA CARS PRIVATE LIMITED`, 300)
      .moveDown(0.2)
      .text(`Account No : 916030050287308`, 300)
      .moveDown(0.2)
      .text(`Bank Name : AXIS BANK LTD`, 300)

      .moveDown(0.2)
      .text(`IFSC Code : UTIB0000726`, 300)




    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();


    doc.moveDown(1.5)

    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();



    const consultantDetailsY = doc.y;
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Customer Details : SHWETA MEHRA", 25, consultantDetailsY - 12)

    doc.moveDown(0.2)

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Mobile Number : 8878332000", 300, consultantDetailsY - 12)

    doc.moveDown(1.5)

    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();



    const consultantDetailsY1 = doc.y;
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Model Details", 25, consultantDetailsY1 - 12)

    doc.moveDown(3)

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(`Model : ${quotationdata?.name} `, 25)

      .moveDown(0.2)
      .text(`Varient: ${quotationdata?.varient}`, 25,)
      .moveDown(0.2)
      .text(`Color :  ${quotationdata?.color}`, 25)

    doc.moveDown(3)






    doc
      .moveTo(20, doc.y)
      .lineTo(300, doc.y)
      .lineWidth(1)
      .strokeColor("black")
      .stroke();
    doc.moveDown(3)


    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(`Exchange Car Detail`, 25)

    doc.moveDown(3)


    doc
      .moveTo(20, doc.y + 10)
      .lineTo(296, doc.y + 10)
      .lineWidth(1)
      .strokeColor("black")
      .stroke();
    doc.moveDown(1)

    doc
      .moveTo(150, doc.y - 3)
      .lineTo(150, doc.y + 72)
      .stroke();


    doc.moveDown(0.5)
    items.forEach((item) => {

      doc.font("Helvetica-Bold").fontSize(10).text(item.label, 24, doc.y);
      doc.font("Helvetica-Bold").fontSize(10).text(item.value, 160, doc.y - 10);

      // Draw a line below each entry
      if (item.label !== "(-) Cash Discount") {
        doc
          .moveTo(20, doc.y)
          .lineTo(296, doc.y)
          .lineWidth(1)
          .strokeColor("black")
          .stroke();
        doc.moveDown(0.5)
      }
    });






    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Particulars", 300, consultantDetailsY1 - 12)

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Amount", 500, consultantDetailsY1 - 12)

    const leftX = 430

    doc
      .moveTo(leftX, doc.y)
      .lineTo(leftX, doc.y + 282)
      .stroke();
    doc.moveDown(1);


    priceDetails.map((item) => {
      // Print the label
      doc.font("Helvetica-Bold").fontSize(10).text(item.label, 300, doc.y);

      // Print the value on the right
      doc.font("Helvetica-Bold").fontSize(10).text(item.value, 432, doc.y - 10);

      // Draw a line below each entry
      doc
        .moveTo(430, doc.y)
        .lineTo(doc.page.width - 20, doc.y)
        .lineWidth(1)
        .strokeColor("black")
        .stroke();
      {
        item.label !== "Installation Charge" ? doc.moveDown(0.5) : ''

      }

    });


    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();
    doc.moveDown(1)


    doc.font("Helvetica-Bold").fontSize(12).text("ON-ROAD PRICE", 300, doc.y, { continued: true });
    doc.text("590876", 432, doc.y);


    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();



    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();
    doc.moveDown(0.4)


    doc.font("Helvetica-Bold").fontSize(12).text("Amount In Words : Five Lakh Ninty Thousand Eight Hundred & Seventy Six ", 30, doc.y,);



    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();


    doc.font("Helvetica-Bold").fontSize(10).text("Terms & Conditions:", 30, doc.y + 20);
    doc.moveDown(); // Adds space below the heading

    doc.font("Helvetica").fontSize(8);

    const terms = [
      "1) Price and statutory levies at the time of delivery are as applicable irrespective of when the initial payment is made.",
      "2) Vehicle will be delivered only after realization of full and final payment.",
      "3) This is not an order form and no claim for priority can be made on the basis of this quotation.",
      "4) This quotation is applicable only for the day of issuance.",
      "5) All the matters/issues (if any) shall be subjected to the exclusive jurisdiction of the competent courts in the State of the Dealer with whom the booking is made.",
      "6) Ex-showroom/insurance price may vary due to any offer from Dealer/Market conditions from time to time.",
      "7) TCS @ 1% applicable if Ex-Showroom Price is above INR 10 lac.",
      "8) Warranty applicable as per manufacturer terms and conditions.",
      "9) The aforementioned prices are tentative in nature and subject to change."
    ];



    terms.forEach((term) => {
      doc.text(term, { width: 550, align: "left" });
      doc.moveDown(0.5); // Adds spacing between each line
    });




    doc.moveDown(5)

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("MAHADEVA CARS PVT LTD", 440, doc.y)


    doc
      .moveTo(20, doc.y)  // Start from left (20px padding)
      .lineTo(doc.page.width - 20, doc.y)  // Extend to the right edge (full width)
      .lineWidth(1)  // Set line thickness
      .strokeColor("black")  // Set line color
      .stroke();



    doc.font("Helvetica-Bold").fontSize(10).text("Customer Signature", 25, doc.y + 10, { continued: true });
    doc.text("Authourized Signatory", 370, doc.y);


    doc.font("Helvetica-Bold").fontSize(25).fillColor("gray").opacity(0.3)
      .rotate(-45, { origin: [doc.page.width / 2, doc.page.height / 2] })
      .text("NOT FOR BANK LOGIN AND FINANCE", 40, doc.page.height / 2, { align: "center" }).opacity(1).rotate(0)




    doc.end();
    stream.on("finish", () => console.log(`✅ PDF saved successfully at: ${outputPath}`
      

    ));

   return true; 

  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    return false; 
  }
}



export const quotationPDf = async (req, res) => {
  try {

      console.log("req.body  for quotion", req.body)

     

    const data = await generateQuotationPDF2(req.body);

    if (data) {
      return res.status(200).json({
        message: 'Successfully created',
      });
    }

    return res.status(500).json({
      message: 'An error occurred while uploading the file.',
    });

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      success: false,
      message: 'An error occurred while uploading the file.',
      error: error.message,
    });
  }
};





export const getVinByCreatedBy = async (req, res) => {
  try {
      const userId = req.user.id; 

      const limit = parseInt(req.query.limit) || 10; // Default limit is 10
      const offset = parseInt(req.query.offset) || 0; // Default offset is 0
     

      const vinDetails = await VinDetails.findAll({
          where: { created_by : userId },
          limit,
          offset
      });

      if (!vinDetails.length) return res.status(404).json({ message: 'No VIN records found for this creator' });

      res.status(200).json(vinDetails);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching VIN details', details: error.message });
  }
};


