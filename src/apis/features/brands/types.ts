import { paths, components } from '../../../types/openapi'
import { Brand } from './db'

// Product model
export type Brand = components['schemas']['Brand']

// Product id path parameter
export type BrandPathParameters = { id: components['parameters']['brandId'] }

// Add a product
// export type AddProductRequestBody = paths['/products']['post']['requestBody']
export type AddBrandRequestBody = {
    name: string
    description?: string
}
export type AddBrandBodiesResponses = paths['/brands']['post']['responses']['201'] | paths['/brands']['post']['responses']['400'] | paths['/brands']['post']['responses']['500']
export type AddBrandResponses = { status: number, upload: AddBrandBodiesResponses }

// Get a product
export type GetBrandBodiesResponses = paths['/brands/{brandId}']['get']['responses']['200'] | paths['/brands/{brandId}']['get']['responses']['404'] | paths['/brands/{brandId}']['get']['responses']['500']
export type GetBrandResponses = { status: number, upload: GetBrandBodiesResponses }


// Get many products
export type GetBrandsQueryParameters = {
    name?: components['parameters']['brandName'] 
    description?: components['parameters']['brandDescription']
}
export type GetBrandsBodiesResponses = paths['/brands']['get']['responses']['200'] | paths['/brands']['get']['responses']['500']
export type GetBrandsResponses = { status: number, upload: GetBrandsBodiesResponses }

// Update a product
// export type UpdateProductRequestBody = paths['/products/{productId}']['patch']['requestBody']
export type UpdateBrandRequestBody = {
    name?: string
    description?: string
} 

// Delete a product
export type DeleteBrandBodiesResponses = paths['/brands/{brandId}']['delete']['responses']['200'] | paths['/brands/{brandId}']['delete']['responses']['400'] | paths['/brands/{brandId}']['delete']['responses']['404'] | paths['/brands/{brandId}']['delete']['responses']['500']
export type DeleteBrandResponses = { status: number, upload: DeleteBrandBodiesResponses }

