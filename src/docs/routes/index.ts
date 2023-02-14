import { Request, Response, Router } from 'express'
import * as path from 'path'
import * as types from '../../types/types'

const routes: Router = Router()

const get: types.HttpMethod = types.HttpMethod.GET

routes[get]('/', (req: Request, res: Response) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'))
    } 
    catch (error: any) {
        res.status(500).send({ code: 'ServerError', message: error.message })
    }
})

export default routes