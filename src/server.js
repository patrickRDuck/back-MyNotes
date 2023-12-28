import 'dotenv/config.js' 
import 'express-async-errors'
import express, { response } from 'express'
import { routes } from './routes/index.js'
import AppError from './utils/appError.js'
import migrationRun from './database/sqlite/migrations/index.js'
import uploadConfig from './configs/upload.js'
import cors from "cors"

migrationRun()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error', 
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status: 'error',
        message:'Internal Server Error.'
    })
})

const PORT = process.env.PORT || 3333
const HOST = "0.0.0.0"
app.listen(Number(PORT), HOST, () => console.log(`Server is running on port ${PORT}`))

// ipv4 192.168.0.8