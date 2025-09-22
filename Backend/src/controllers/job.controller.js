import { Job } from "../models/job.model.js";

/* =========FOR ADMIN ============ */

export const postJob = async (req, res) => {
   try {
      console.log("req.body >>>", req.body);

      const {
         title,
         description,
         requirements, 
         salary,
         location,
         jobType,
         experience,
         position,
         companyId,
      } = req.body;

      const userId = req.id; 

      if (
         !title ||
         !description ||
         !requirements ||
         !salary ||
         !location ||
         !jobType ||
         !experience ||
         !position ||
         !companyId
      ) {
         return res.status(400).json({
            message: "Something is missing in required fields",
            success: false,
         });
      }

      if (isNaN(Number(salary))) {
         return res.status(400).json({
            message: "Salary must be a valid number",
            success: false,
         });
      }

      const job = await Job.create({
         title,
         description,
         requirements: requirements.split(","), 
         salary: Number(salary),
         location,
         jobType,
         experienceLevel: experience,
         position,
         company: companyId,
         created_by: userId,
      });

      console.log("Job created >>>", job);

      return res.status(201).json({
         message: "New Job created successfully",
         job,
         success: true,
      });
   } catch (error) {
      console.error("ERROR POSTING JOB: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};

/* =======FOR STUDENTS =========== */
export const getAllJobs = async (req, res) => {
   try {
      const keyword = req.query.keyword || "";
      const query = {
         $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
         ],
      };

      const jobs = await Job.find(query);
      if (!jobs) {
         return res.status(404).json({
            message: "Jobs not found",
            success: false,
         });
      }

      return res.status(200).json({
         jobs,
         success: true,
      });
   } catch (error) {
      console.log("ERROR TO GETING ALL THE JOBS: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};

/* =======FOR STUDENTS =========== */
export const getJobById = async (req, res) => {
   try {
      const jobId = req.params.id;
      if (!jobId) {
         return res.status(404).json({
            message: "Cannot found the JobId",
            success: false,
         });
      }

      const job = await Job.findById(jobId).populate({
         path:"applications"
      });
      if (!job) {
         return res.status(404).json({
            message: "Cannot found the Job by Id",
            success: false,
         });
      }

      return res.status(200).json({
         job,
         success: true,
      });
   } catch (error) {
      console.log("ERROR TO GETING THE JOB BY ID: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};

/* =========FOR ADMIN ============ */
export const getAdminJobs = async (req, res) => {
   try {
      const adminId = req.id;
      if (!adminId) {
         return res.status(404).json({
            message: "adminId not found",
            success: false,
         });
      }

      const jobs = await Job.find({
         created_by: adminId,
      });
      if (!jobs) {
         return res.status(404).json({
            message: "Jobs not found",
            success: false,
         });
      }

      return res.status(200).json({
         jobs,
         success: true,
      });
      
   } catch (error) {
      console.log("ERROR TO GETING THE JOB BY ID: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};
