import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

/* =========== MIDDLEWARES ============== */
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

/* ===========ROUTES IMPORTS============ */
import userRoute from './routes/user.route.js'




/* ============ROUTES DECELARATIONS============== */
app.use('/api/v1/user', userRoute)

export { app }
