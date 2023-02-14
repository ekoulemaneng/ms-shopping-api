import { Types } from 'mongoose'
import { paths, components } from '../../../types/openapi'
import { Product } from './db'

// Product model
export type Product = components['schemas']['Product']

// Product id path parameter
export type ProductPathParameters = { id: components['parameters']['productId'] }

// Add a product
// export type AddProductRequestBody = paths['/products']['post']['requestBody']
export type AddProductRequestBody = {
    name: string
    description?: string
    brand: string
    category: string
    quantity: number
    price: number
}
export type AddProductBodiesResponses = paths['/products']['post']['responses']['201'] | paths['/products']['post']['responses']['400'] | paths['/products']['post']['responses']['404'] | paths['/products']['post']['responses']['500']
export type AddProductResponses = { status: number, upload: AddProductBodiesResponses }

// Get a product
export type GetProductBodiesResponses = paths['/products/{productId}']['get']['responses']['200'] | paths['/products/{productId}']['get']['responses']['404'] | paths['/products/{productId}']['get']['responses']['500']
export type GetProductResponses = { status: number, upload: GetProductBodiesResponses }


// Get many products
export type GetProductsQueryParameters = {
    name?: components['parameters']['productName'] 
    description?: components['parameters']['productDescription']
    category?: components['parameters']['categoryId']
    brand?: components['parameters']['brandId']
    min_quantity?: components['parameters']['productMinQuantity']
    max_quantity?: components['parameters']['productMaxQuantity']
    min_price?: components['parameters']['productMinPrice']
    max_price?: components['parameters']['productMaxPrice']
    min_date?: components['parameters']['productMinDate']
    max_date?: components['parameters']['productMaxDate']
}
export type GetProductsBodiesResponses = paths['/products']['get']['responses']['200'] | paths['/products']['get']['responses']['500']
export type GetProductsResponses = { status: number, upload: GetProductsBodiesResponses }

// Update a product
// export type UpdateProductRequestBody = paths['/products/{productId}']['patch']['requestBody']
export type UpdateProductRequestBody = {
    name?: string
    description?: string
    brand?: string
    category?: string
    quantity?: number
    price?: number
} 

// Delete a product
export type DeleteProductBodiesResponses = paths['/products/{productId}']['delete']['responses']['200'] | paths['/products/{productId}']['delete']['responses']['400'] | paths['/products/{productId}']['delete']['responses']['404'] | paths['/products/{productId}']['delete']['responses']['500']
export type DeleteProductResponses = { status: number, upload: DeleteProductBodiesResponses }

