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
        if (!(await Brand.exists({ _id: new Types.ObjectId(brand) }))) return _brandResponses.BrandNotFound
        if (!(await Category.exists({ _id: new Types.ObjectId(category) }))) return _categoryResponses.CategoryNotFound
        const product: HydratedDocument<IProduct> = await Product.create({ name, description, brand, category, quantity, price })
        const _product = await Product.findById(product._id.toString()).populate('category brand').lean()
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
        const filter = {}
        const products = await Product.find(filter).populate('category brand').lean()
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