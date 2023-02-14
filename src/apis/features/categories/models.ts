import * as types from './types'
import { host } from '../../../config'

export const Category = (category: any): types.Category => {
    return {
        id: category._id.toString(),
        name: category.name,
        description: category.description,
        url: `${host}/apis/v1/categories/${category._id.toString()}`
    }
}