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
        message:'Account created  sucessfully',
        success: true
      })

   } catch (error) {
    console.log(error,'Something error in register the user ')

   }
};

