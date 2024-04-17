const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require('cors')

require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

// app.use('/', express.static(path.resolve(__dirname, 'dist')))

app.use('/api', require('./router/router'))
app.use(require('./router/exception'))

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})