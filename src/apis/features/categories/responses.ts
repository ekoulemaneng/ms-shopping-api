import * as types from './types'
import * as models from './models'
import { StandardResponse } from '../../../types/types'

export const Category = (category: any): types.addCategoryResponses => {
    return {
        content: {
            'application/json': models.Category(category)
        }
    }
}

export const CategoryNotFound: StandardResponse = {
    content: {
        'application/json': {
            code: 'CategoryNotFound',
            message: 'There is no category with this id.'
        }
    }
}