import { Router, Request, Response } from 'express'
import validate from './../../../middlewares/validate'
import * as inputs from './inputs'
import * as controllers from './controllers'
import * as types from './types'
import * as httpResponses from '../../../utils/httpResponses'


const router: Router = Router()

// Add a new category
router.post('/', /*validate(inputs.addBrand),*/ async (req: Request<never, never, types.AddCategoryRequestBody>, res: Response) => {
    try {
        const { name, description } = req.body
        const response: types.AddCategoryResponses = await controllers.addCategory(name, description)
        httpResponses.general(res, response)  
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Retrieve many categories by using filter
router.get('/', async (req: Request<never, never, never, types.GetCategoriesQueryParameters>, res: Response) => {
    try {
        const { name, description } = req.query
        const response: types.GetCategoriesResponses = await controllers.getCategories(name, description)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Get a category by id
router.get('/:id', async (req: Request<types.CategoryPathParameters>, res: Response) => {
    try {
        const { id } = req.params
        const response: types.GetCategoryResponses = await controllers.getCategoryById(id)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Update a category
router.patch('/:id', async (req: Request<types.CategoryPathParameters, never, types.UpdateCategoryRequestBody>, res: Response) => {
    try {
        const { id } = req.params
        const { name, description } = req.body
        const response: types.GetCategoryResponses = await controllers.updateCategory(id, name, description)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

// Delete a category
router.delete('/:id', async (req: Request<types.CategoryPathParameters>, res: Response) => {
    try {
        const { id } = req.params
        const response: types.DeleteCategoryResponses = await controllers.deleteCategory(id)
        httpResponses.general(res, response)
    }
    catch (error: any) {
        console.error(error)
        httpResponses.serverError(res, error)
    }
})

export default router