import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
   try {
      const { fullname, email, password, phoneNumber, role } = res.body;

      if (!fullname || !email || password || !phoneNumber || !role) {
         return res.status(400).json({
            message: "Something is missing in the required field ",
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

      const hassedPassword = await bcrypt.hash(password, 10);
      await User.create({
         fullname,
         email,
         password: hassedPassword,
         phoneNumber,
         role,
      });

      return res.status(201).json({
         message: "Account created  sucessfully",
         success: true,
      });
   } catch (error) {
      console.log(error, "Something error in register the user ");
   }
};

export const login = async () => {
   try {
      const { fullname, email, password } = res.body;

      if (!fullname || !email || password || !role) {
         return res.status(400).json({
            message: "Something is missing in the required field ",
            success: false,
         });
      }

      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({
            message: "user are not exists with this email",
            success: false,
         });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
         return res.status(400).json({
            message: "password is incorrect",
            success: false,
         });
      }

      if ((role = !user.role)) {
         return res.status(400).json({
            message: "Account do not exists with this role",
            success: false,
         });
      }

      const tokenData = {
         userId: user._id,
      };
      const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN_KEY, {
         expiresin: "1d",
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
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
         })
         .json({
            message: `Welcome back! ${user.fullname}`,
            success: true,
         });
   } catch (error) {
      console.log(error, "Something error in login the user");
   }
};

export const logout = async (req, res) => {
   try {
      return res.status(200).cookie("token", "", { maxAge: 0 }).json({
         message: "Loggout the user successfully",
         success: true,
      });
   } catch (error) {
      console.log(error, "Something error in log outting the user");
   }
};
