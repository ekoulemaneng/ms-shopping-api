import { Router, Request, Response } from 'express'
import validate from './../../../middlewares/validate'
import * as inputs from './inputs'
import * as controllers from './controllers'
import * as types from './types'
import * as httpResponses from '../../../utils/httpResponses'

const router: Router = Router()

router.post('/', /*validate(inputs.addBrand),*/ async (req: Request<never, never, types.AddBrandRequestBody>, res: Response) => {
    try {
        const { name, description } = req.body
        const response: types.AddBrandResponses = await controllers.addBrand(name, description)
        httpResponses.general(res, response)  
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Retrieve many products by using filter
router.get('/', async (req: Request<never, never, never, types.GetBrandsQueryParameters>, res: Response) => {
    try {
        const { name, description } = req.query
        const response: types.GetBrandsResponses = await controllers.getBrands(name, description)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Get a product by id
router.get('/:id', async (req: Request<types.BrandPathParameters>, res: Response) => {
    try {
        const { id } = req.params
        const response: types.GetBrandResponses = await controllers.getProductById(id)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Update a product
router.patch('/:id', async (req: Request<types.BrandPathParameters, never, types.UpdateBrandRequestBody>, res: Response) => {
    try {
        const { id } = req.params
        const { name, description } = req.body
        const response: types.GetBrandResponses = await controllers.updateProduct(id, name, description)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Delete a product
router.delete('/:id', async (req: Request<types.BrandPathParameters>, res: Response) => {
    try {
        const { id } = req.params
        const response: types.DeleteBrandResponses = await controllers.deleteBrand(id)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

export default router