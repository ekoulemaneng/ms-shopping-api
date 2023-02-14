import * as types from './types'
import * as models from './models'
import { StandardResponse, EntityDeletedBodyResponse } from '../../../types/types'

export const Product = (product: any): types.AddProductBodiesResponses => {
    return {
        content: {
            'application/json': models.Product(product)
        }
    }
}

export const Products = (products: any[]): types.GetProductsBodiesResponses => {
    return {
        content: {
            'application/json': {
                items: products.map(product => models.Product(product)),
                count: products.length
            }
        }
    }
}

export const ProductNotFound: StandardResponse = {
    content: {
        'application/json': {
            code: 'ProductNotFound',
            message: 'There is no product with this id.'
        }
    }
}

export const ProductDeleted = (id: string): EntityDeletedBodyResponse => {
    return {
        content: {
            'application/json': {
                id,
                code: 'ProductDeleted',
                entity: 'product'
            }
        }
    }
}