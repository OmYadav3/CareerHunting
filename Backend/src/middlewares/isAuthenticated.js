import jwt from "jsonwebstoken";

export const isAuthenticated = async (req, res, next) => {
   try {
      const token = req.cookies.token;
      if (!token) {
         return res.status(401).json({
            message: "User not authenicated",
            success: false,
         });
      }

      const decoded = await jwt.verify(token, process.env.SECRET_TOKEN_KEY);
      if (!decoded) {
         return res.status(401).json({
            message: "Invalid token ",
            success: false,
         });
      }

      req.id = decoded.userId;
      next();
   } catch (error) {
      console.log(error, "Something token error to authenicate or decoded");
   }
};
