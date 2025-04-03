import Enquiry from "../models/Enquiry.js";
import LeadEnquiry from "../models/LeadEnquiry.js";
import Leadquotation from "../models/Leadquotation.js";
import LoanDetails from "../models/LoanDetails.js";
import { sequelizedbconnection } from "../services/sequelizedbcon.js";
const sequelize = sequelizedbconnection();



// export const createLoanDetail1 = async (req, res) => {
//   try {
//     const loanData = req.body; 

//     if (!loanData.loan_id || !loanData.dealer_id || !loanData.branch_id) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }


//     const newLoanDetail = await LoanDetails.create(loanData);

//     return res.status(201).json({
//       message: 'Loan details created successfully',
//       data: newLoanDetail,
//     });
//   } catch (error) {
//     console.error('Error occurred while creating loan details:', error);

//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };



export async function generateUniqueEnquiryId(prefix = "ENQMCPL") {
  const lastQuotation = await LeadEnquiry.findOne({
    attributes: ["enquiry_id"],
    order: [["enquiry_id", "DESC"]],
  });

  console.log(lastQuotation?.enquiry_id);
  let nextNumber = 1; // Default if no records exist

  if (lastQuotation && lastQuotation.enquiry_id) {
    const lastNumber = parseInt(
      lastQuotation.enquiry_id.replace(prefix, ""),
      10
    );
    console.log(lastNumber);
    nextNumber = lastNumber + 1;
  }

  // Format the new ID with the dynamic prefix
  const newEnquiryId = `${prefix}${nextNumber.toString().padStart(8, "0")}`;
  return newEnquiryId;
}


export async function generateUniqueEnquiryIdlone(prefix = "ENQMCPL") {
  const lastQuotation = await LoanDetails.findOne({
    attributes: ["loan_id"],
    order: [["loan_id", "DESC"]],
  });

  console.log(lastQuotation?.loan_id);
  
  let nextNumber = 1; // Default if no records exist

  if (lastQuotation && lastQuotation.loan_id) {
    const lastNumber = parseInt(
      lastQuotation.loan_id.replace(prefix, ""),
      10
    );
    console.log(lastNumber);
    nextNumber = lastNumber + 1;
  }

  // Format the new ID with the dynamic prefix
  const newEnquiryId = `${prefix}${nextNumber.toString().padStart(8, "0")}`;
  return newEnquiryId;
}



export const createLoanDetail = async (req, res) => {
  try {
    console.log("new============", req.body,   "new============")
    const sequelize = sequelizedbconnection();

    const transaction = await sequelize.transaction();

    const uniqueId = await generateUniqueEnquiryId("EMCPL")

    const uniqueIdloneid = await generateUniqueEnquiryIdlone("LNMCPL")

    

  



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
      accessories,
      vas,
      extended_warranty,
      amc,
      installation_charge,
      other_charge,
      charge_reason,
      temporary_registration,
      number_plate,
      cash_scheme,
      vin_discount,
      vehicle_exchange_amt,
      final_on_road_price,

      color_name,
      // Loan details
      loan_id,
      booking_id,
      payment_method,
      preferred_bank, 
      emi_status,
      no_of_emi,
      emi_amount,
      emi_bank,
      occupation,
      ownertype,
      organization_name,
      tenure,
      operative_bank,
      annual_income,
      gross_income,
      net_income,
      credit_score,
      photo_passport,
      aadhaar_image,
      pancard_image,
      address_proof,
      statement_image,
      it_return_image,
      loan_statement,
      form_16_image,
      salary_slip,
      audit_image,
      loan_amount,
      down_payment_amount,
      loan_bank_name,
      bank_loan_amount,
      net_disbursement_amount,
      loan_rate,
      loan_tenure,
      loan_emi,
      loan_interest_amount,
      rate_change,
      estimate_bank_loan,
      estimate_loan_tenure,
      estimated_loan_rate,
      estimate_emi,
      estimate_interest,
      bank_id,
      dsa_code,
      bank_interest_id,
      processing_fees,
      loan_status,
      loan_proposed_by,
      user_status,
      sales_remark,
      team_leader_remark,
      sales_manager_remark,
      loan_remark,
      fe_remark,
      manager_remark,
      banker_remark,
      sanction_letter,
      sanction_branch_name,
      branch_contact_person,
      branch_mobile,
      lead_type,
      created_by,
      updated_by,
      updated_date,
      bank_posting_date,
      banker_userid,
      filecomplete_date,
      disbursement_date,
      loan_posted_by,
      application_status,
      lead_referred,
      refered_date,
      referred_remark,
      quotation_Id,
      bank_name,
      bank_name2, 
      enquiry_id,
      alternate_number,
      user_gender,
      name_prefix,
      booking_amt,
      date_of_birth,
      source_remark,
      booking_receipt_no,
    
      

    } = req.body;

    const data = req.body.CarAmounts;
    const data2 = req.body;
      console.log(req.user)


    // if (!first_name || !last_name || !mobile || !loan_id) {
    //   return res
    //     .status(400)
    //     .json({
    //       message: "Title, First Name, Last Name, and Mobile Number are required.",
    //     });
    // }

    // if (!loanData.loan_id || !loanData.dealer_id || !loanData.branch_id) {
    //   return res.status(400).json({ message: 'Missing required fields' });
    // }

    // Create Enquiry
    const enquiry = await LeadEnquiry.create({
      ...data,
      name_prefix,
      booking_amt,
      date_of_birth,
      color_id,
    
      booking_receipt_no,

      branch_id   : req.user?.branch_id,
      dealer_id : req.user?.dealer_id,
     
      first_name,
      last_name,
      mobile,
      alternate_number,
      gender  :  user_gender=== "M" ? "Male" : "Female", 
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
    }, { transaction });

    const updateResult = await Enquiry.update(
      { enquiry_status: 'PROCESSING' }, // values to update
      { where: { enquiry_id: enquiry_id } }   // conditions to find rows to update
    );
      
     console.log("update", updateResult)

    // Create Quotation Linked to Enquiry
    const quotation = await Leadquotation.create({
      bank_name,
      bank_name2,
      branch_id   : req.user?.branch_id,
      dealer_id : req.user?.dealer_id,
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
      accessories,
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

    }, { transaction });
    



    const newLoanDetail = await LoanDetails.create({

      loan_id: quotation.quotation_Id,
      enquiry_id: enquiry.enquiry_id,
      loan_id,

      branch_id   : req.user?.branch_id,
      dealer_id : req.user?.dealer_id,

      quotation_Id : quotation.quotation_Id,

      name : first_name + last_name,

      mobile,
      alternate_number,


      booking_id,
      payment_method,
      preferred_bank : bank_name,
      emi_status,
      no_of_emi,
      emi_amount,
      emi_bank,
      occupation,
      ownertype,
      organization_name,
      tenure,
      operative_bank,
      annual_income,
      gross_income,
      net_income,
      credit_score,
      photo_passport,
      aadhaar_image,
      pancard_image,
      address_proof,
      statement_image,
      it_return_image,
      loan_statement,
      form_16_image,
      salary_slip,
      audit_image,
      loan_amount,
      down_payment_amount,
      loan_bank_name,
      bank_loan_amount,
      net_disbursement_amount,
      loan_rate,
      loan_tenure,
      loan_emi,
      loan_interest_amount,
      rate_change,
      estimate_bank_loan,
      estimate_loan_tenure,
      estimated_loan_rate,
      estimate_emi,
      estimate_interest,
      bank_id,
      dsa_code,
      bank_interest_id,
      processing_fees,
      loan_status : "OPEN",
      loan_proposed_by,
      user_status,
      sales_remark,
      team_leader_remark,
      sales_manager_remark,
      loan_remark,
      fe_remark,
      manager_remark,
      banker_remark,
      sanction_letter,
      sanction_branch_name,
      branch_contact_person,
      branch_mobile,
      lead_type,
      created_by,
      updated_by,
      updated_date,
      bank_posting_date,
      banker_userid,
      filecomplete_date,
      disbursement_date,
      loan_posted_by,
      application_status : "OPEN",
      lead_referred,
      refered_date,
      referred_remark,
      loan_id : uniqueIdloneid,

    }, { transaction });

     

    await transaction.commit();

    res.status(201).json({
      message: "Enquiry and Quotation created successfully",
      enquiry,
      quotation,
      newLoanDetail,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log({ error: error.message })
  }
};



export const getLoanDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID dynamically
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    // Raw SQL query with dynamic userId
    const query = `
      SELECT * FROM enquiry 
      LEFT JOIN quotation ON enquiry.enquiry_id = quotation.enquiry_id
      LEFT JOIN loan_detail ON enquiry.enquiry_id = loan_detail.enquiry_id
        LEFT JOIN car_model ON   quotation.model_id = car_model.model_id
      LEFT JOIN car_detail ON quotation.cardetail_id = car_detail.detail_id
      
      WHERE enquiry.created_by = :userId OR quotation.created_by = :userId

      UNION

      SELECT * FROM enquiry
      RIGHT JOIN quotation ON enquiry.enquiry_id = quotation.enquiry_id
      RIGHT JOIN loan_detail ON enquiry.enquiry_id = loan_detail.enquiry_id
      RIGHT JOIN car_model ON   quotation.model_id = car_model.model_id
      RIGHT JOIN car_detail ON quotation.cardetail_id = car_detail.detail_id
      WHERE enquiry.created_by = :userId OR quotation.created_by = :userId
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
        SELECT enquiry.enquiry_id FROM enquiry
        LEFT JOIN quotation ON enquiry.enquiry_id = quotation.enquiry_id
        WHERE enquiry.created_by = :userId OR quotation.created_by = :userId
        UNION
        SELECT enquiry.enquiry_id FROM enquiry
        RIGHT JOIN quotation ON enquiry.enquiry_id = quotation.enquiry_id
        WHERE enquiry.created_by = :userId OR quotation.created_by = :userId
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






