import * as types from './types'
import * as _responses from './_responses'
import { HydratedDocument } from 'mongoose'
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
 * @param name Name of the product
 * @param description Description of the product
 * @returns List of brands with data
 */
export const getBrands = async (name?: string, description?: string): Promise<types.GetBrandsResponses> => {
    try {
        const filter = {}
        const brands = await Brand.find(filter).lean()
        return _responses.getBrands(brands)
    }
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * @param id Unique id of the product
 * @returns Product data
 */
export const getProductById = async (id: string): Promise<types.GetProductResponses> => {
    try {
        const product = await Product.findById(id).populate('category brand').lean()
        if (!product) return _responses.ProductNotFound
        return _responses.getProduct(product)
    }
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * @param id Unique id of product
 * @param name Name of product
 * @param description Description of product
 * @param brand Brand id of the product
 * @param category Category id of product
 * @param quantity Quantity of the product
 * @param price Price of the product
 * @returns Product data 
 */
export const updateProduct = async (id: string, name?: string, description?: string, category?: string, brand?: string, quantity?: number, price?: number): Promise<types.GetProductResponses> => {
    try {
        let product: HydratedDocument<IProduct> | null = await Product.findById(id)
        if (!product) return _responses.ProductNotFound
        if (!(await Brand.exists({ _id: brand }))) return _brandResponses.BrandNotFound
        if (!(await Category.exists({ _id: brand }))) return _categoryResponses.CategoryNotFound
        if (typeof name !== 'undefined') product.name = name
        if (typeof description !== 'undefined') product.description = description
        if (typeof brand !== 'undefined') product.brand = new Types.ObjectId(brand)
        if (typeof category !== 'undefined') product.category = new Types.ObjectId(category)
        if (typeof quantity !== 'undefined') product.quantity = quantity
        if (typeof price !== 'undefined') product.price = price
        await product.save()
        product = await Product.findById(id).populate('category brand').lean()
        return _responses.getProduct(product)
    }
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

// Delete a product
export const deleteProduct = async (id: string): Promise<types.DeleteProductResponses> => {
    try {
        let product: HydratedDocument<IProduct> | null = await Product.findById(id)
        if (!product) return _responses.ProductNotFound
        product.deleted = true
        product = await product.save()
        return _responses.deleteProduct(product._id.toString())
    } 
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}