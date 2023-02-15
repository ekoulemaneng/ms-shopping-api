import { paths, components } from '../../../types/openapi'
import { Category } from './db'

// Category model
export type Category = components['schemas']['Category']

// Category id path parameter
export type CategoryPathParameters = { id: components['parameters']['categoryId'] }

// Add a category
// export type AddProductRequestBody = paths['/products']['post']['requestBody']
export type AddCategoryRequestBody = {
    name: string
    description?: string
}
export type AddCategoryBodiesResponses = paths['/categories']['post']['responses']['201'] | paths['/categories']['post']['responses']['400'] | paths['/categories']['post']['responses']['500']
export type AddCategoryResponses = { status: number, upload: AddCategoryBodiesResponses }

// Get a category
export type GetCategoryBodiesResponses = paths['/categories/{categoryId}']['get']['responses']['200'] | paths['/categories/{categoryId}']['get']['responses']['404'] | paths['/categories/{categoryId}']['get']['responses']['500']
export type GetCategoryResponses = { status: number, upload: GetCategoryBodiesResponses }


// Get many categories
export type GetCategoriesQueryParameters = {
    name?: components['parameters']['categoryName'] 
    description?: components['parameters']['categoryDescription']
}
export type GetCategoriesBodiesResponses = paths['/categories']['get']['responses']['200'] | paths['/categories']['get']['responses']['500']
export type GetCategoriesResponses = { status: number, upload: GetCategoriesBodiesResponses }

// Update a category
// export type UpdateProductRequestBody = paths['/products/{productId}']['patch']['requestBody']
export type UpdateCategoryRequestBody = {
    name?: string
    description?: string
} 

// Delete a category
export type DeleteCategoryBodiesResponses = paths['/categories/{categoryId}']['delete']['responses']['200'] | paths['/categories/{categoryId}']['delete']['responses']['400'] | paths['/categories/{categoryId}']['delete']['responses']['404'] | paths['/categories/{categoryId}']['delete']['responses']['500']
export type DeleteCategoryResponses = { status: number, upload: DeleteCategoryBodiesResponses }

