import { application } from "express";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
   try {
      const userId = req.id;
      const jobId = req.params.id;

      if (!jobId) {
         return res.status(404).json({
            message: "Job id not found",
            success: false,
         });
      }

      /* check if the user are already applied for this job */
      const existingApplication = await Application.findOne({
         job: jobId,
         applicant: userId,
      });
      console.log(existingApplication, "EXISTING ONE")

      if (existingApplication) {
         return res.status(400).json({
            message: "You have already applied for this job ",
            success: false,
         });
      }

      /* check if the job exists */
      const job = await Job.findById(jobId);
      if (!job) {
         return res.status(400).json({
            message: "Cannot found the job on this id  ",
            success: false,
         });
      }

      /* create the new application */
      const newApplication = await Application.create({
         job: jobId,
         applicant: userId,
      });

      // job.application.push(newApplication._id);
      job.applications.push(newApplication._id)
      await job.save();

      console.log("New application === >> ", newApplication)

      return res.status(200).json({
         message: "Job apply successfully",
         newApplication,
         success: true,
      });

   } catch (error) {
      console.log("ERROR FOR APPLY IN JOB: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};

export const getAppliedJobs = async (req, res) => {
   try {
      const userId = req.id;
      const application = await Application.find({ applicant: userId })
         .sort({ createdAt: -1 })
         .populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
               path: "company",
               options: { sort: { createdAt: -1 } },
            },
         });

      if (!application) {
         return res.status(404).json({
            message: "no application",
            success: false,
         });
      }

      return res.status(200).json({
         application,
         success: true,
      });
   } catch (error) {
      console.log("ERROR FOR GETTING THE JOB: ", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};

// export const getApplicants = async (req, res) => {
//    try {
//       const jobId = req.params.id;

//       const job = await Application.findOne({job:jobId})
//       .populate({
//          path: "applications",
//          options: { sort: { createdAt: -1 } },
//          populate: {
//             path: "applicant",
//             options: { sort: { createdAt: -1 } },
//          },
//       });
//       if (!job) {
//          return res.status(404).json({
//             message: "No Job found",
//             success: false,
//          });
//       }

//       return res.status(200).json({
//          job,
//          success: true,
//       });

//    } catch (error) {
//       console.log("ERROR WHILE GETTING APPLICANTS ", error);
//       return res.status(500).json({
//          message: "Internal server error",
//          success: false,
//       });
//    }
// };

export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
   try {
      const { status } = req.body;
      const applicationId = req.params.id;
      
      if (!status) {
         return res.status(404).json({
            message: "status is required",
            success: false,
         });
      }

      const application = await Application.findOne({ _id: applicationId });
      if (!application) {
         return res.status(404).json({
            message: "application not found",
            success: false,
         });
      }

      /* updating the status */
      application.status = status.toLowerCase();
      await application.save();

      return res.status(200).json({
         message: "Status update successfully",
         success: true,
      });

   } catch (error) {
      console.log("ERROR WHILE UPDATING THE STATUS :", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};
