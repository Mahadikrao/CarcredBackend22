
import PDFDocumentWithTables from 'pdfkit-table';
import fs from "fs";
import axios from "axios";
import path from "path";


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
  

  const downloadImage = async (url, filename) => {
    const response = await axios({ url, responseType: "arraybuffer" });
    fs.writeFileSync(filename, response.data);
    return filename;
  };
  
  
  
  const table = {
    headers: [
        { label: "Varient", property: "variant", width: 100, align: "left" },
        { label: "EX-SHOWROOM", property: "ex_showroom", width: 90, align: "center" },
        { label: "TCS", property: "tcs", width: 50, align: "center" },
        { label: "REGISTRATION", property: "registration", width: 80, align: "center" },
        { label: "INSURANCE", property: "insurance", width: 80, align: "center" },
        { label: "BASIC KIT", property: "basic_kit", width: 60, align: "center" },
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
  
  
  
  
  
  
  export async function generateQuotationPDF() {
  
    const tempDir = "temp";
    fs.mkdirSync(tempDir, { recursive: true });
  
  
    const outputPath = path.join("outputs", "Quotation.pdf");
  
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
    .text(data.addressbranch, { align: "center",  lineGap: 3, });
  
  doc
    .text(
      `${data.contact_number}, ${data.contact_number_alt}, GSTN: ${data.gst_number}`,
      { align: "center",  lineGap: 3, }
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
  .text("Customer Name:    Mr SHAURYA RAO", 25,)
  .moveDown(0.2)
  .text("Address:                Raipur, CHHATTISGARH", 25,)
  .moveDown(0.2)
  .text("Email:                    Carcred7667@gmail.com", 25)
  .moveDown(0.2)
  .text("Mobile:                  08236081798", 25);
  doc.moveDown(0.2)
  
  doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .text("Date: 12-03-2025", 700, customerDetailsY)
  .moveDown(0.3)
  .font("Helvetica")
  .text("Consultant Name:  SHWETA MEHRA", 600)
  .moveDown(0.2)
  .text("Contact Number:   8878332000", 600);
  
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
    .text(data.addressbranch, { align: "center",  lineGap: 3, });
  
  doc
    .text(
      `${data.contact_number}, ${data.contact_number_alt}, GSTN: ${data.gst_number}`,
      { align: "center",  lineGap: 3, }
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
  doc.font('Helvetica-Bold').fontSize(10).text("Terms & Conditions :", { underline: true, indent : 2})
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
  