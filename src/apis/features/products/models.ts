import * as types from './types'
import { host } from '../../../config'

export const Product = (product: any): types.Product => {
    return {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        category: {
            id: product.category._id.toString(),
            name: product.category.name,
            description: product.category.description
        },
        brand: {
            id: product.brand._id.toString(),
            name: product.brand.name,
            description: product.brand.description
        },
        quantity: product.quantity,
        price: product.price,
        date: product.updatedAt,
        url: `${host}/apis/v1/products/${product._id.toString()}`
    }
}