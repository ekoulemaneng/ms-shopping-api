import * as responses from './responses'
import * as types from './types'
import { StandardResponse, EntityDeletedResponse } from '../../../types/types'

export const getProduct = (product: any): types.GetProductResponses => {
    return {
        status: 200,
        upload: responses.Product(product)
    }
}

export const getProducts = (products: any[]): types.GetProductsResponses => {
    return {
        status: 200,
        upload: responses.Products(products)
    }
}

export const deleteProduct = (id: string): EntityDeletedResponse => {
    return {
        status: 200,
        upload: responses.ProductDeleted(id)
    }
}

export const getProductCreated = (product: any): types.AddProductResponses => {
    return {
        status: 201,
        upload: responses.Product(product)
    }
}

export const ProductNotFound: { status: number, upload: StandardResponse } = {
    status: 404,
    upload: responses.ProductNotFound
}