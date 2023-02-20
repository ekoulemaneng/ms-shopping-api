import { Router, Request, Response } from 'express'
import validate from './../../../middlewares/validate'
import * as inputs from './inputs'
import * as controllers from './controllers'
import * as types from './types'
import * as httpResponses from '../../../utils/httpResponses'
import { /*TypedRequest*/ } from '../../../types/types'

const router: Router = Router()

// A new product
router.post('/', validate(inputs.addProduct), async (req: Request<never, never, types.AddProductRequestBody>, res: Response) => {
    try {
        const { name, description, category, brand, quantity, price } = req.body
        const response: types.AddProductResponses = await controllers.addProduct(name, category, brand, quantity, price, description)
        httpResponses.general(res, response)  
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Retrieve many products by using filter
router.get('/', validate(inputs.getProducts), async (req: Request<never, never, never, types.GetProductsQueryParameters>, res: Response) => {
    try {
        const { name, description, category, brand, min_quantity, max_quantity, min_price, max_price, min_date, max_date } = req.query
        const response: types.GetProductsResponses = await controllers.getProducts(name, description, category, brand, min_quantity, max_quantity, min_price, max_price, min_date, max_date)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Get a product by id
router.get('/:id', validate(inputs.getProduct), async (req: Request<types.ProductPathParameters>, res: Response) => {
    try {
        const { id } = req.params
        const response: types.GetProductResponses = await controllers.getProductById(id)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Update a product
router.patch('/:id', validate(inputs.updateProduct), async (req: Request<types.ProductPathParameters, never, types.UpdateProductRequestBody>, res: Response) => {
    try {
        const { id } = req.params
        const { name, description, category, brand, quantity, price } = req.body
        const response: types.GetProductResponses = await controllers.updateProduct(id, name, description, category, brand, quantity, price)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Delete a product
router.delete('/:id', validate(inputs.deleteProduct), async (req: Request<types.ProductPathParameters>, res: Response) => {
    try {
        const { id } = req.params
        const response: types.DeleteProductResponses = await controllers.deleteProduct(id)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

export default router