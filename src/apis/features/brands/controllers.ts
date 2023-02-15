import * as types from './types'
import * as _responses from './_responses'
import { HydratedDocument, Types } from 'mongoose'
import { Brand, IBrand } from './db'

/**
 * @param name Name of the brand
 * @param description Description of the brand
 * @returns New created brand with data
 */
export const addBrand = async (name: string, description?: string): Promise<types.AddBrandResponses> => {
    try {  
        let brand: HydratedDocument<IBrand> = await Brand.create({ name, description })
        return _responses.getBrandCreated(brand)
    } 
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * @param name Name of the brand
 * @param description Description of the brand
 * @returns List of brands with data
 */
export const getBrands = async (name?: string, description?: string): Promise<types.GetBrandsResponses> => {
    try {
        const filter: any = {}
        filter.deleted = { $eq: false }
        if (typeof name !== 'undefined') filter.name = { $regex: new RegExp(`^.*${name}.*$`, 'i') }
        if (typeof description !== 'undefined') filter.description = { $regex: new RegExp(`^.*${description}.*$`, 'i') }
        const brands = await Brand.find(filter).lean()
        return _responses.getBrands(brands)
    }
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * @param id Unique id of the brand
 * @returns Product data
 */
export const getProductById = async (id: string): Promise<types.GetBrandResponses> => {
    try {
        const brand = await Brand.findById(id).lean()
        if (!brand) return _responses.BrandNotFound
        return _responses.getBrand(brand)
    }
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * @param id Unique id of the brand
 * @param name Name of the brand
 * @param description Description of the brand
 * @returns Brand data 
 */
export const updateProduct = async (id: string, name?: string, description?: string): Promise<types.GetBrandResponses> => {
    try {
        let brand: HydratedDocument<IBrand> | null = await Brand.findById(id)
        if (!brand) return _responses.BrandNotFound
        if (typeof name !== 'undefined') brand.name = name
        if (typeof description !== 'undefined') brand.description = description
        await brand.save()
        brand = await Brand.findById(id).lean()
        return _responses.getBrand(brand)
    }
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

// Delete a product
export const deleteBrand = async (id: string): Promise<types.DeleteBrandResponses> => {
    try {
        let brand: HydratedDocument<IBrand> | null = await Brand.findById(id)
        if (!brand) return _responses.BrandNotFound
        brand.deleted = true
        brand = await brand.save()
        return _responses.deleteBrand(brand._id.toString())
    } 
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}