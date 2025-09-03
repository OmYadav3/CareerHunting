import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
   try {
      const { fullname, email, password, phoneNumber, role } = req.body;
      console.log("req.body: ", req.body); 

      if (!fullname) {
         return res.status(400).json({
            message: `fullname is missing in the required field `,
            success: false,
         });
      }
      if (!email) {
         return res.status(400).json({
            message: `email is missing in the required field`,
            success: false,
         });
      }
      if (!password) {
         return res.status(400).json({
            message: `password is missing in the required field`,
            success: false,
         });
      }
      if (!phoneNumber) {
         return res.status(400).json({
            message: `phoneNumber is missing in the required field `,
            success: false,
         });
      }
      if (!role) {
         return res.status(400).json({
            message: `role is missing in the required field `,
            success: false,
         });
      }

      const user = await User.findOne({ email });
      if (user) {
         return res.status(400).json({
            message: "user already exist with this email",
            success: false,
         });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
         fullname,
         email,
         password: hashedPassword,
         phoneNumber,
         role,
      });

      // console.log(message, ":>> Account created sucessfully")

      return res.status(201).json({
         message: "Account created sucessfully",
         success: true,
      });
   } catch (error) {
      console.log(error, "Something error in register the user ");
      return res.status(500).json({
         message: "Internal Server Error",
         success: false,
         error: error.message,
      });
   }
};

export const login = async (req, res) => {
   try {
      const { email, password, role } = req.body;
      console.log(req.body, "BODY AA GYI");

      if (!email || !password || !role) {
         return res.status(400).json({
            message: "Something is missing in the required fields",
            success: false,
         });
      }

      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({
            message: "User does not exist with this email",
            success: false,
         });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
         return res.status(400).json({
            message: "Password is incorrect",
            success: false,
         });
      }

      if (role !== user.role) {
         return res.status(400).json({
            message: "Account does not exist with this role",
            success: false,
         });
      }

      const tokenData = { userId: user._id };
      const token = jwt.sign(tokenData, process.env.SECRET_TOKEN_KEY, {
         expiresIn: "1d",
      });

      user = {
         _id: user._id,
         fullname: user.fullname,
         email: user.email,
         phoneNumber: user.phoneNumber,
         role: user.role,
         profile: user.profile,
      };

      return res
         .status(200)
         .cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            sameSite: "strict",
         })
         .json({
            message: `Welcome back! ${user.fullname}`,
            user,
            success: true,
         });
         
   } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};

export const logout = async (req, res) => {
   try {
      return res.status(200).cookie("token", "", { maxAge: 0 }).json({
         message: "Logout the user successfully",
         success: true,
      });
   } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};

export const updateProfile = async (req, res) => {
   try {
      const { fullname, email, phoneNumber, bio, skills } = req.body;
      console.log(req.body, "FHIR SE NAHI MILI KYA BODY");

      /* ================ RESUME COMES LATER ===========*/

      // const file = req.file;
      // if(!file){
      //   return res.status(400).json({
      //       message: 'Cannot Found the file',
      //       success: false
      //   })
      // }

      let skillsArray;
      if (skills) {
         skillsArray = skills.split(",");
      }

      const userId = req.id; // middleware authentication

      let user = await User.findById(userId);
      if (!user) {
         return res.status(400).json({
            message: "user not found",
            success: false,
         });
      }

      /* ======UPDATING THE DATA IN THE DATABASE ======*/
      if (fullname) user.fullname = fullname;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (bio) user.profile.bio = bio;
      if (skills) user.profile.skills = skillsArray;

      /* ================ RESUME COMES LATER ===========*/

      await user.save();

      user = {
         _id: user._id,
         fullname: user.fullname,
         email: user.email,
         phoneNumber: user.phoneNumber,
         role: user.role,
         profile: user.profile,
      };

      return res.status(200).json({
         message: "Profile updated successfully",
         user,
         success: true,
      });
   } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({
         message: "Internal server error",
         success: false,
      });
   }
};
