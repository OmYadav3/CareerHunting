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
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'




/* ============ROUTES DECLARATIONS============== */
app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRoute)

export { app }
