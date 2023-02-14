import { paths, components } from '../../../types/openapi'

export type addCategoryRequestBody = paths['/categories']['post']['requestBody']
export type addCategoryResponses = (paths['/categories']['post']['responses']['201'] | paths['/categories']['post']['responses']['400'] | paths['/categories']['post']['responses']['404'])
export type Category = components['schemas']['Category']