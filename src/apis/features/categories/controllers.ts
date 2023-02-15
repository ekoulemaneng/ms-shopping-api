import * as types from './types'
import * as _responses from './_responses'
import { HydratedDocument, Types } from 'mongoose'
import { Category, ICategory } from './db'

/**
 * Add a new category
 * @param name Name of the category
 * @param description Description of the category
 * @returns New created category with data
 */
export const addCategory = async (name: string, description?: string): Promise<types.AddCategoryResponses> => {
    try {  
        let category: HydratedDocument<ICategory> = await Category.create({ name, description })
        return _responses.getCategoryCreated(category)
    } 
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * Retrieve many categories by using filter
 * @param name Name of the category
 * @param description Description of the category
 * @returns List of categories with data
 */
export const getCategories = async (name?: string, description?: string): Promise<types.GetCategoriesResponses> => {
    try {
        const filter: any = {}
        filter.deleted = { $eq: false }
        if (typeof name !== 'undefined') filter.name = { $regex: new RegExp(`^.*${name}.*$`, 'i') }
        if (typeof description !== 'undefined') filter.description = { $regex: new RegExp(`^.*${description}.*$`, 'i') }
        const categories = await Category.find(filter).lean()
        return _responses.getCategories(categories)
    }
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * Get a category by id
 * @param id Unique id of the category
 * @returns Category data
 */
export const getCategoryById = async (id: string): Promise<types.GetCategoryResponses> => {
    try {
        const category = await Category.findById(id).lean()
        if (!category) return _responses.CategoryNotFound
        return _responses.getCategory(category)
    }
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * Update a category
 * @param id Unique id of the category
 * @param name Name of the category
 * @param description Description of the category
 * @returns Category data 
 */
export const updateCategory = async (id: string, name?: string, description?: string): Promise<types.GetCategoryResponses> => {
    try {
        let category: HydratedDocument<ICategory> | null = await Category.findById(id)
        if (!category) return _responses.CategoryNotFound
        if (typeof name !== 'undefined') category.name = name
        if (typeof description !== 'undefined') category.description = description
        await category.save()
        category = await Category.findById(id).lean()
        return _responses.getCategory(category)
    }
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * Delete a category
 * @param id Unique id of the category
 * @returns Date of deleted entity
 */
export const deleteCategory = async (id: string): Promise<types.DeleteCategoryResponses> => {
    try {
        let category: HydratedDocument<ICategory> | null = await Category.findById(id)
        if (!category) return _responses.CategoryNotFound
        category.deleted = true
        category = await category.save()
        return _responses.deleteCategory(category._id.toString())
    } 
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}