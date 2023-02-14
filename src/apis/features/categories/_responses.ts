import * as responses from './responses'
import * as types from './types'
import { StandardResponse } from '../../../types/types'

export const CategoryCreated = (category: any): { status: number, upload: types.addCategoryResponses } => {
    return {
        status: 201,
        upload: responses.Category(category)
    }
}

export const CategoryNotFound: { status: number, upload: StandardResponse } = {
    status: 404,
    upload: responses.CategoryNotFound
}