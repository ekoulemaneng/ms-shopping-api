import * as types from './types'
import * as models from './models'
import { StandardResponse, EntityDeletedBodyResponse } from '../../../types/types'

export const Category = (category: any): types.AddCategoryBodiesResponses => {
    return {
        content: {
            'application/json': models.Category(category)
        }
    }
}

export const Categories = (categories: any[]): types.GetCategoriesBodiesResponses => {
    return {
        content: {
            'application/json': {
                items: categories.map(category => models.Category(category)),
                count: categories.length
            }
        }
    }
}

export const CategoryNotFound: StandardResponse = {
    content: {
        'application/json': {
            code: 'CategoryNotFound',
            message: 'There is no brand with this id.'
        }
    }
}

export const CategoryDeleted = (id: string): EntityDeletedBodyResponse => {
    return {
        content: {
            'application/json': {
                id,
                code: 'CategoryDeleted',
                entity: 'category'
            }
        }
    }
}