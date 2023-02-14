import { Router, Request, Response } from 'express'
import validate from './../../../middlewares/validate'
import * as inputs from './inputs'
import * as controllers from './controllers'
import * as types from './types'
import * as httpResponses from '../../../utils/httpResponses'

const routes: Router = Router()

routes.post('/', validate(inputs.addCategory), async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body
        const response: { status: number, upload: types.addCategoryResponses } = await controllers.addCategory(name, description)
        httpResponses.general(res, response)  
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

export default routes