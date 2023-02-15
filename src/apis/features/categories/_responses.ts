import * as responses from './responses'
import * as types from './types'
import { StandardResponse, EntityDeletedResponse } from '../../../types/types'

export const getCategory = (category: any): types.GetCategoryResponses => {
    return {
        status: 200,
        upload: responses.Category(category)
    }
}

export const getCategories = (categories: any[]): types.GetCategoriesResponses => {
    return {
        status: 200,
        upload: responses.Categories(categories)
    }
}

export const deleteCategory = (id: string): EntityDeletedResponse => {
    return {
        status: 200,
        upload: responses.CategoryDeleted(id)
    }
}

export const getCategoryCreated = (category: any): types.AddCategoryResponses => {
    return {
        status: 201,
        upload: responses.Category(category)
    }
}

export const CategoryNotFound: { status: number, upload: StandardResponse } = {
    status: 404,
    upload: responses.CategoryNotFound
}