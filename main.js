import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import dotenv from 'dotenv'
import router from "./router/router.js";
import exception from "./router/exception.js";

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

// app.use('/', express.static(path.resolve(__dirname, 'dist')))

app.use('/api', router)
app.use(exception)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})