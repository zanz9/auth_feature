const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require('cors')

require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

// app.use('/', express.static(path.resolve(__dirname, 'dist')))

app.use('/api', require('./router/router'))
app.use(require('./router/exception'))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})