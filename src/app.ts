import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import docsRoutes from './docs/routes'
import apisRoutes from './apis/routes'
import path from 'path'
import mongodb from './config/mongodb'

mongodb()

const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/docs/v1', express.static(path.join(__dirname,'/docs/routes/assets'))) 

app.use('/docs', docsRoutes)
app.use('/apis/v1', apisRoutes)

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    type Err = {
        status: number
        upload: {
            code: string
            message: string
        }
    }
    let error: Err
    if (typeof err === 'string') error = { status: 400, upload: { code: 'Failed', message: err } }
    else error = { status: 500, upload: { code: 'Failed', message: err.message } }
    res.status(error.status).send(error.upload)
})

export default app