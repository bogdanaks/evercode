const express = require('express')
const cors = require('cors')
const http = require('http')

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//routes
app.use('/api/crypto', require('./routes/api/crypto.routes'))

//start server
async function start() {
    try {
        await server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
    } catch (error) {
        console.log(`Server error: ${error}`)
        process.exit(1)
    }
}

start()
