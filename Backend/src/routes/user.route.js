import express from "express";
import {
   login,
   logout,
   register,
   updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").get(login);
router.route("/profile/update").post(updateProfile);
router.route("/logout").get(logout);
