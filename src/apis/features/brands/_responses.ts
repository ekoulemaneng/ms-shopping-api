import * as responses from './responses'
import * as types from './types'
import { StandardResponse, EntityDeletedResponse } from '../../../types/types'

export const getProduct = (product: any): types.GetProductResponses => {
    return {
        status: 200,
        upload: responses.Product(product)
    }
}

export const getBrands = (brands: any[]): types.GetBrandsResponses => {
    return {
        status: 200,
        upload: responses.Brands(brands)
    }
}

export const deleteProduct = (id: string): EntityDeletedResponse => {
    return {
        status: 200,
        upload: responses.ProductDeleted(id)
    }
}

export const getBrandCreated = (brand: any): types.AddBrandResponses => {
    return {
        status: 201,
        upload: responses.Brand(brand)
    }
}

export const BrandNotFound: { status: number, upload: StandardResponse } = {
    status: 404,
    upload: responses.BrandNotFound
}