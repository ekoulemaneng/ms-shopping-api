import * as types from './types'
import { host } from '../../../config'

export const Brand = (brand: any): types.Brand => {
    return {
        id: brand._id.toString(),
        name: brand.name,
        description: brand.description,
        url: `${host}/apis/v1/products/${brand._id.toString()}`
    }
}