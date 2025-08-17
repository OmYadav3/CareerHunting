import dotenv from "dotenv"
import {app} from "./app.js"
import connectionDb from "./db/db.js"

dotenv.config({
   path:'./.env'
})


connectionDb();

app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
      
   } )