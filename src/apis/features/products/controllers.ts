import * as types from './types'
import * as _responses from './_responses'
import * as _brandResponses from '../brands/_responses'
import * as _categoryResponses from '../categories/_responses'
import { HydratedDocument, Types } from 'mongoose'
import { Product, IProduct } from './db'
import { Brand } from '../brands/db'
import { Category } from '../categories/db'

/**
 * @param name Name of the product
 * @param description Description of the product
 * @param category Category id of the product
 * @param brand Brand id of the product
 * @param quantity Quantity of the product
 * @param price Price of the product
 * @returns New created product with data
 */
export const addProduct = async (name: string, category: string, brand: string, quantity: number, price: number, description?: string): Promise<types.AddProductResponses> => {
    try {
        // Check if brand and quantity exist
        if (!(await Brand.exists({ _id: new Types.ObjectId(brand), deleted: false }))) return _brandResponses.BrandNotFound
        if (!(await Category.exists({ _id: new Types.ObjectId(category), deleted: false }))) return _categoryResponses.CategoryNotFound
        // Create a new product
        const product: HydratedDocument<IProduct> = await Product.create({ name, description, brand, category, quantity, price })
        // Get the product after populating
        const _product = await Product.findById(product._id.toString()).populate('category brand').lean()
        // return response
        return _responses.getProductCreated(_product)
    } 
    catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * @param name Name of the product
 * @param description Description of the product
 * @param category Category id of the product
 * @param brand Brand id of the product
 * @param min_quantity Minimum quantity of the product
 * @param max_quantity Maximum quantity of the product
 * @param min_price Minimum price of the product
 * @param max_price Maximum price of the product
 * @param min_date - minimum date of the product
 * @param max_date  maximum date of the product
 * @returns List of products with data
 */
export const getProducts = async (name?: string, description?: string, category?: string, brand?: string, min_quantity?: number, max_quantity?: number, min_price?: number, max_price?: number, min_date?: string, max_date?: string): Promise<types.GetProductsResponses> => {
    try {
        // Set filter
        const filter: any = {}
        filter.deleted = { $eq: false }
        if (typeof name !== 'undefined') filter.name = { $regex: new RegExp(`^.*${name}.*$`, 'i') }
        if (typeof description !== 'undefined') filter.description = { $regex: new RegExp(`^.*${description}.*$`, 'i') }
        if (typeof brand !== 'undefined') filter.brand = { $eq: new Types.ObjectId(brand) }
        if (typeof category !== 'undefined') filter.category = { $eq: new Types.ObjectId(category) }
        if (typeof min_quantity !== 'undefined' && typeof max_quantity === 'undefined') filter.quantity = { $gte: min_quantity }
        else if (typeof min_quantity === 'undefined' && typeof max_quantity !== 'undefined') filter.quantity = { $lte: max_quantity }
        else if (typeof min_quantity !== 'undefined' && typeof max_quantity !== 'undefined') filter.$and = [{ quantity: { $gte: min_quantity } }, { quantity: { $lte: max_quantity } }]
        if (typeof min_price !== 'undefined' && typeof max_price === 'undefined') filter.price = { $gte: min_price }
        else if (typeof min_price === 'undefined' && typeof max_price !== 'undefined') filter.price = { $lte: max_price }
        else if (typeof min_price !== 'undefined' && typeof max_price !== 'undefined') filter.$and = [{ price: { $gte: min_price } }, { price: { $lte: max_price } }]
        if (typeof min_date !== 'undefined' && typeof max_date === 'undefined') filter.updatedAt = { $gte: min_date }
        else if (typeof min_date === 'undefined' && typeof max_date !== 'undefined') filter.updatedAt = { $lte: max_price }
        else if (typeof min_date !== 'undefined' && typeof max_date !== 'undefined') filter.$and = [{ updatedAt: { $gte: min_date } }, { updatedAt: { $lte: max_price } }]
        // Get products
        const products = await Product.find(filter).populate('category brand').lean()
        // Return response
        return _responses.getProducts(products)
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
        // Get product
        const product = await Product.findById(id).populate('category brand').lean()
        // Check if product exists
        if (!product) return _responses.ProductNotFound
        // Return response with product data
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
        // Get product
        let product: HydratedDocument<IProduct> | null = await Product.findById(id)
        // Check if product exists
        if (!product) return _responses.ProductNotFound
        // Update product
        if (typeof name !== 'undefined') product.name = name
        if (typeof description !== 'undefined') product.description = description
        if (typeof brand !== 'undefined') {
            if (!(await Brand.exists({ _id: new Types.ObjectId(brand) }))) return _brandResponses.BrandNotFound
            product.brand = new Types.ObjectId(brand)
        }
        if (typeof category !== 'undefined') {
            if (!(await Category.exists({ _id: new Types.ObjectId(category) }))) return _categoryResponses.CategoryNotFound
            product.category = new Types.ObjectId(category)
        }
        if (typeof quantity !== 'undefined') product.quantity = quantity
        if (typeof price !== 'undefined') product.price = price
        await product.save()
        // Get product after updating and populating it
        product = await Product.findById(id).populate('category brand').lean()
        // Return product data
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