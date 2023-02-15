import * as types from './types'
import * as models from './models'
import { StandardResponse, EntityDeletedBodyResponse } from '../../../types/types'

export const Brand = (brand: any): types.AddBrandBodiesResponses => {
    return {
        content: {
            'application/json': models.Brand(brand)
        }
    }
}

export const Brands = (brands: any[]): types.GetBrandsBodiesResponses => {
    return {
        content: {
            'application/json': {
                items: brands.map(brand => models.Brand(brand)),
                count: brands.length
            }
        }
    }
}

export const BrandNotFound: StandardResponse = {
    content: {
        'application/json': {
            code: 'BrandNotFound',
            message: 'There is no brand with this id.'
        }
    }
}

export const BrandDeleted = (id: string): EntityDeletedBodyResponse => {
    return {
        content: {
            'application/json': {
                id,
                code: 'BrandDeleted',
                entity: 'brand'
            }
        }
    }
}