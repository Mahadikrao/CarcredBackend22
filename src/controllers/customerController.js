
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

const sequelize = sequelizedbconnection();



const cars = [
  { color: "ELECTRIC BLUE", image: "https://shorturl.at/iv6Eu" },
  { color: "ICE COOL WHITE + MYSTERY BLACK ROOF", image: "https://shorturl.at/iv6Eu" },
  { color: "ELECTRIC BLUE", image: "https://shorturl.at/iv6Eu" },
  { color: "ICE COOL WHITE + MYSTERY BLACK ROOF", image: "https://shorturl.at/iv6Eu" },
  { color: "ELECTRIC BLUE", image: "https://shorturl.at/iv6Eu" },
  { color: "ICE COOL WHITE + MYSTERY BLACK ROOF", image: "https://shorturl.at/iv6Eu" },
  { color: "ELECTRIC BLUE", image: "https://shorturl.at/iv6Eu" },
  { color: "ICE COOL WHITE + MYSTERY BLACK ROOF", image: "https://shorturl.at/iv6Eu" },

];







const downloadImage = async (url, filename) => {
  const response = await axios({ url, responseType: "arraybuffer" });
  fs.writeFileSync(filename, response.data);
  return filename;
};




export async function generateUniqueEnquiryId() {

  const lastQuotation = await Enquiry.findOne({
    attributes: ["enquiry_id"],
    order: [["enquiry_id", "DESC"]],
  });

  console.log(lastQuotation.enquiry_id)
  let nextNumber = 1; // Default if no records exist

  if (lastQuotation && lastQuotation.enquiry_id) {



    const lastNumber = parseInt(lastQuotation.enquiry_id.replace("ENQMCPL", ""), 10);
    console.log(lastNumber)

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
      await downloadImage(cars[i].image, localImagePath);

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
      temporary_registration

    } = req.body;
    const data = req.body;

    console.log("data xxxx ++++++++++++++++++++++++++++++++++++++", data , "data xxxx +++++++++++++++++++++++++++++++++++++++++++++++++")
      

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
      ...data

    });
    console.log("data", quotation,)

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






export const getEnquiry = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID dynamically
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    // Raw SQL query with dynamic userId
    const query = `
      SELECT * FROM enquiry1 
      LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
      WHERE enquiry1.created_by = :userId OR raw_quotation.created_by = :userId

      UNION

      SELECT * FROM enquiry1 
      RIGHT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
      WHERE enquiry1.created_by = :userId OR raw_quotation.created_by = :userId
      LIMIT :limit OFFSET :offset;
    `;

    // Execute raw query using Sequelize
    const enquiries = await sequelize.query(query, {
      replacements: { userId, limit, offset },
      type: sequelize.QueryTypes.SELECT,
    });

    // Count total records (without LIMIT & OFFSET)
    const countQuery = `
      SELECT COUNT(*) as total FROM (
        SELECT enquiry1.enquiry_id FROM enquiry1 
        LEFT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
        WHERE enquiry1.created_by = :userId OR raw_quotation.created_by = :userId
        UNION
        SELECT enquiry1.enquiry_id FROM enquiry1 
        RIGHT JOIN raw_quotation ON enquiry1.enquiry_id = raw_quotation.enquiry_id
        WHERE enquiry1.created_by = :userId OR raw_quotation.created_by = :userId
      ) AS combinedData;
    `;

    const totalCountResult = await sequelize.query(countQuery, {
      replacements: { userId },
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
    const { model_id } = req.body; // Extract model_id from request body

    const responseData = await car_detail.findAll({
      where: { model_id: model_id },
    });

    if (!responseData || responseData.length === 0) {
      return res.status(404).json({ message: "No car details found" });
    }

    // If table is an object, initialize it properly

    table.datas = responseData

    // Call generateQuotationPDF and store its response
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
























// export const BranchDetails = async (req, res) => {
//   try {

//     const userLocation = await UserDealerLocation.findOne({
//       where: { user_id:  req.user.id },
//     });

//    const Branchdata = await Branch.findOne({where : {dealer_id : userLocation.dealer_id}})


//    const BranchdataAll = await DealerDetails.findOne({where : {dealer_id : Branchdata.dealer_id}})

//     return res.status(200).json({...BranchdataAll, ...userLocation ,...Branchdata });
//   } catch (error) {
//     console.error("Error fetching branch details:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

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
