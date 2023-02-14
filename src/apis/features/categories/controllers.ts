import * as types from './types'
import * as _responses from './_responses'
import { HydratedDocument } from 'mongoose'
import { Category, ICategory } from './db'

export const addCategory = async (name: string, description?: string): Promise<{ status: number, upload: types.addCategoryResponses }> => {
    try {
        const category: HydratedDocument<ICategory> = await Category.create({ name, description })
        return _responses.CategoryCreated(category)
    } 
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}