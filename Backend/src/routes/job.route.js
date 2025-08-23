import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { 
  getAdminJobs, 
  getAllJobs, 
  getJobById, 
  postJob 
} from "../controllers/job.controller.js";

const router = express.Router();

// Create a new job
router.post("/post", isAuthenticated, postJob);

// Get all jobs (public or authenticated based on your needs)
router.get("/all", getAllJobs); 

// Get job by ID
router.get("/get/:id", getJobById);

// Get jobs posted by a specific admin
router.get("/getadminjob/:id", isAuthenticated, getAdminJobs);

export default router;
