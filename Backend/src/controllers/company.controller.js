import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
   try {
      const { companyName } = req.body;
      // console.log(companyName);

      if (!companyName) {
         return res.status(400).json({
            message: "Company name is already exists",
            success: false,
         });
      }

      let company = await Company.findOne({ companyName });

      // console.log(company);

      if (company) {
         return res.status(400).json({
            message: "You cannot register the same company",
            success: false,
         });
      }

      company = await Company.create({
         name: companyName,
         userId: req.id,
      });

      console.log(company, "Company register Successfully");

      return res.status(201).json({
         message: "Company register Successfully",
         company,
         success: true,
      });
   } catch (error) {
      console.log("ERROR TO REGISTER: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};

export const getCompany = async (req, res) => {
   try {
      const userId = req.id;
      const companies = await Company.find({ userId });
      console.log(companies);

      if (!companies) {
         return res.status(404).json({
            message: "Cannot find any company",
            success: false,
         });
      }

      return res.status(200).json({
         message: " Found all Companies by registered the user",
         companies,
         success: true,
      });
   } catch (error) {
      console.log("ERROR TO GETING THE COMPANY: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};

export const getCompanyById = async (req, res) => {
   try {
      const companyId = req.params.id;
      console.log(companyId )
      if (!companyId) {
         return res.status(400).json({
            message: "Cannot found the companyId",
            success: false,
         });
      }

      const company = await Company.findById( companyId );
      if (!company) {
         return res.status(404).json({
            message: "Cannot found the Company by Id ",
         });
      }

      return res.status(200).json({
         company,
         success: true,
      });

   } catch (error) {
      console.log("ERROR TO GETING THE COMPANY BY ID: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};

export const updateCompany = async (req, res) => {
   try {
      const { name, description, website, location } = req.body;
      // console.log(req.body)
      const file = req.file;

      /* =============CLOUDNARY WORK HERE ============== */

      const updateData = { name, description, website, location };

      const company = await Company.findByIdAndUpdate(
         req.params.id,
         updateData,
         { new: true }
      );
      if (!company) {
         return res.status(404).json({
            message: "Company not found",
            success: false,
         });
      }

      return res.status(200).json({
         message: "Update the Company information successfully",
         company,
         success: true,
      });
   } catch (error) {
      console.log("ERROR TO UPDATING THE COMPANY: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};
