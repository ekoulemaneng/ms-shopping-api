import { Request,  } from 'express'
import { components } from './openapi'

export type StandardResponse = components['responses']['StandardResponse']
export type EntityDeletedBodyResponse = components['responses']['EntityDeleted']
export type EntityDeletedResponse = { status: number, upload: EntityDeletedBodyResponse }

/*
export interface TypedRequest<T, U, V> extends Request {
    params: T
    query: U
    body: V
}
*/

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch'
}

