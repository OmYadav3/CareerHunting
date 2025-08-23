import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobs.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/all").get(isAuthenticated, getAllJobs);
router.route("/get/:id").post(isAuthenticated, getJobById);
router.route("/getadminjobs/:id").post(isAuthenticated, getAdminJobs);

export default router;
