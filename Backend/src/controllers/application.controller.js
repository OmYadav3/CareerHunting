import { createRef } from "react";
import { Application } from "../models/application.model.js";
import { Job } from "../models/Job.model.js";

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
      job.application.push(newApplication._id);
      await job.save();

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
